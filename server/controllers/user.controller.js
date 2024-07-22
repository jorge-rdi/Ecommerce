const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { generateTempToken } = require("../util/generateToken");
const secretKey = process.env.JWT_SECRET_KEY;
const { sendPasswordToken } = require("../util/email");
const PasswordToken = require("../models/passwordToken.model");
/* const crypto = require("crypto"); */
//esto se ejecuta una vez que se valida todo en el user.model



module.exports.createUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            const newuser = await User.create(req.body);
            res.status(201);
            res.json(newuser);
            return
        }
        res.status(409);
        res.json({ email: { message: "Este email ya ha sido registrado!" } });
    } catch (error) {
        res.status(500);
        res.json({ message: error });
    }
};
//Endpoint para logueo

module.exports.findAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200);
        res.json(users);
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};
module.exports.findUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (user) {
            res.status(200);
            res.json(user);
            return;
        }
        res.status(404);
        res.json({ error: "User not found" });
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};
module.exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
        res.status(200);
        res.json(updatedUser);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};
module.exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({ _id: req.params.id });
        res.status(200);
        res.json(deletedUser);

    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};

module.exports.login = async (req, res) => {
    try {
        //Bucar usuario
        const user = await User.findOne({ email: req.body.email })
        //si no existe y retorno resultado 
        if (user == null) {
            res.status(404);
            res.json({ email: { message: "Usuario no encontrado" } });
            return
        }
        // Si exite se revisa contrasenia 
        const validatePassword = await bcrypt.compare(req.body.password, user.password);
        //si no coincide paro el resultado
        if (validatePassword === false) {
            res.status(401);
            res.json({ password: { message: "Contraseña incorrecta" } });
            console.log(validatePassword);
            return
        }
        //si contrrasenia ok genera jwt y cookie
        const newJWT = jwt.sign({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            rol: user.rol
        }, secretKey, { expiresIn: "60m" });
        res.cookie("userToken", newJWT, secretKey, { httpOnly: true });
        res.status(200);
        const rsUser = {
            _id: user._id,
            rol: user.rol,
            firstName: user.firstName,
            lastName: user.lastName
        }
        res.json({ user: rsUser, token: newJWT });
    } catch (error) {
        res.status(500);
        res.json({ message: error });
    }
}
//Guarda las cookies
module.exports.cookie = async (req, res) => {
    try {
        res.cookie("mycookie", "mydata", { httpOnly: true });
        res.json({ message: "ok" });
    } catch (error) {
        res.json({ message: error });
    }
}
//Cerrar sesion
module.exports.loggout = async (req, res) => {
    try {
        res.clearCookie("userToken");
        res.json({ message: "logout succesfully" });
        res.status(200);
    } catch (error) {
        res.json({ message: error });
    }
}


// PASSWORD
/* module.exports.Password = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    try {
        //se busca el usuario por email
        if (!user) {
            res.status(404);
            return res.json({ email: { message: "No podemos encontrar al email proporcionado!" } }); // IMPORTANTE
        }
        //se genera un token random para el usuario
        const resetToken = user.createResetPasswordToken();
        await user.save({ validateBeforeSave: false }); //desactiva las validaciones antes de guardar el user
        //enviar al usuario el token
        const resetUrl = `${process.env.API_URL}/account/resetPassword/${resetToken}`;
        const message = resetUrl
        await sendEmail({
            email: user.email,
            subject: 'Solicitud de cambio de contraseña',
            message: message
        });
        return res.status(200).json({
            status: "success",
            message: "El link para cambiar su contraseña, fue mandado a su email!"
        });
    } catch (error) {
        return res.status(500).json({ message: "Ha ocurrido un error al mandar el email. Intentelo mas tarde." }); // IMPORTANTE
    }
} */
/*
**IMPORTANTE NOTA**
Es importante colocar return, debido a que 
En el codigo, puede haber varios lugares donde se manda la respuesta al cliente  de esta manera (res.json() o res.status().json()), y es posible
que el código siga ejecutándose después de haber enviado una respuesta.
Después de enviar una respuesta en el bloque if (!user), hay que agregar un return para salir de la función
y evitar que el código siguiente también intente enviar una respuesta.
*/
/* module.exports.resetPassword = async (req, res) => {
    const date = Date.now();
    try {
        const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
        console.log('Token:', token);
        console.log('Date:', date);
        const user = await User.findOne({ passwordResetToken: token, passwordResetTokenExpire: { $gt: date } });
        console.error(user);
        if (!user) {
            return res.status(404).json({ message: "El link es invalido o ha expirado!" });
        }
        user.password = req.body.password;
        user.confirmPassword = req.body.confirmPassword;
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpire = undefined;
        user.passwordChangeAt = Date.now();
        await user.save({ validateBeforeSave: true });
        const newJWT = jwt.sign({
            _id: user._id
        }, secretKey, { expiresIn: "60min" });
        res.cookie("userToken", newJWT, secretKey, { httpOnly: true });
        res.status(200);
        res.json({ message: "logged ok" })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error });
    }
} */

//-----------------------------RESET PASSWORD-------------------------------------------------->

module.exports.passwordResetToken = async (req, res) => {
    const { email } = req.query; // trae valores del clientes
    try {
        // req.query del email
        console.log(email);
        //verificamos si el email existe
        const user = await User.findOne({ email: email }); // busca al usuario que tenga el email igual al email quitado del req.query
        if (!user) {
            res.status(401);
            res.json({ error: "usuario no encontrado!" });
            return;
        }
        //Buscamos si el usuario que encontramos tiene el token
        //en caso que el usuario pida mas de una vez el token, entonces se elimina y se setea con un nuevo token
        const token = await PasswordToken.findOne({ user: user._id }); // en el modelo PasswordToken se relaciono el passwordToke con un usuario
        //está buscando un token de contraseña que esté asociado con el ID del usuario 
        console.log(token);
        //si tiene el token, lo eliminamos
        if (token) {
            await PasswordToken.deleteOne({ _id: token._id });// en PasswordToken, busca 
        }
        //Si no existe, generacion de token
        const rawToken = generateTempToken(6);// se genera un token, conla funcion generateTempToken
        const newToken = await PasswordToken.create({ token: rawToken, user: user._id, valid: true }); // se cre el nuevo token
        const emailToken = await sendPasswordToken({ user: user, token: rawToken });// envia el email con el usuario y el token 
        console.log(emailToken);
        res.status(200);
        res.json(newToken);
    } catch (error) {
        res.status(500);
        res.json({ message: error });
    }

}


module.exports.passwordReset = async (req, res) => {
    const { email, password, confirmPassword, token } = req.body;
    const data = {
        password, confirmPassword
    }
    console.log(email, password, confirmPassword, token);
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(401);
            res.json({ error: "usuario no encontrado!" });
            return;
        }
        const activeToken = await PasswordToken.findOne({ user: user._id });//busca un token que coincida con el user id
        console.log(activeToken);
        if (!activeToken || !activeToken.valid) {// si el active token no existe y si no es valid = false, entonces el token es invalido
            res.status(401);
            res.json({ errors: "Token invalido" });
            return;
        }
        //compara el token proporcionado con el token almacenado en la base de datos utilizando bcrypt.compare
        const validate = await bcrypt.compare(token, activeToken.token);
        if (!validate) {
            res.status(401);
            res.json({ errors: "Token invalido" });
            return;
        }
        //Actualiza la contrasenia
        const userPatch = await User.findOneAndUpdate({ email: email }, data, { new: true, runValidators: true });
        //vuelve invalido el token ya que el valid lo pone en false
        const tokenPatch = await PasswordToken.findOneAndUpdate({ user: user._id }, { valid: false }, { new: true, runValidators: true });
        console.log(tokenPatch);
        res.status(200);
        res.json(userPatch);
    } catch (error) {
        res.status(500);
        res.json({ message: error });
    }

}