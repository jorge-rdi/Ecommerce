const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, "El nombre es obligatorio."],
        minLength: [2, "Debe ser mayor a 2 caracter."],
        maxLength: [100, "Debe ser menor a 100 caracteres."]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "El apellido es obligatorio."],
        minLength: [2, "Debe ser mayor a 2 caracter."],
        maxLength: [100, "Debe ser menor a 100 caracteres."]
    },
    email: {
        type: String,
        trim: true, //Elimina los espacios en blanco al inicio y al final
        lowercase: true, //Convierte todo a minuscula antes de enviar el formulario
        unique: true,
        required: [true, "El email es obligatorio."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Por favor, ingrese un email válido."
        }
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria."],
        minLength: [8, "La contraseña debe tener mas de 8 caracteres."],
    },
    rol: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpire: Date

}, { timestamps: true, versionkey: false });
//ESTOS SON MIDDLEWARE: Procesos en medio

// crea un esquema virtual o temporal para hacer la confirmacion de la contrasenia
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);


// ANTES DE VALIDAR verifica si las contrasenia son iguales 
UserSchema.pre('validate', function (next) {
    if (!this.confirmPassword) {
        this.invalidate('confirmPassword', 'Este campo es requerido.');
    } else if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Las contraseñas deben coincidir.');
    }
    next();
});
//antes de guardar se ejecuta esto y hashea la contrasenia
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();// hace que se ejecute lo siguiente
        });
});

 UserSchema.methods.createResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');//los bytes a utilizar y convierte a string en hexadecimal
    
    //En este caso se especifica el algoritmo a usar que es el sha256, se especifica que campo queremos encriptar
    //Y el digest nos especifica en que formato queremos encriptar, el formato utilizado es el 'hex' o el hexadesimal    
    
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetTokenExpire = Date.now() + 10 * 60 * 1000; // tiempo a expirar, 10 minutos

    console.log(resetToken, this.passwordResetToken);

    return resetToken;
} 
/* 
// 1. Este es un middleware de Mongoose que se ejecuta antes de la operación "findOneAndUpdate".
//    "findOneAndUpdate" es una operación de Mongoose que busca un documento por su ID y lo actualiza con los datos proporcionados.
UserSchema.pre(["findOneAndUpdate"], async function (next) {
    // Este es un middleware de Mongoose que se ejecuta antes de la operación "findOneAndUpdate".
    // "findOneAndUpdate" es una operación de Mongoose que busca un documento por su ID y lo actualiza con los datos proporcionados.
    const data = this.getUpdate();
    // "this.getUpdate()" obtiene los datos que se van a actualizar en la operación "findOneAndUpdate".
    if (data.password) {
        //Si los datos de actualización incluyen una contraseña, entonces se ejecuta el siguiente bloque de código.
        try {
            const salt = await bcrypt.genSalt(10);
            //Genera una "sal" utilizando bcrypt. La "sal" es un conjunto de datos aleatorios que se utilizan como entrada adicional para la función de hash.
            const hash = await bcrypt.hash(data.password, salt);
            // Crea un hash de la contraseña proporcionada utilizando la "sal" generada. 
            //Asegura que la contraseña almacenada en la base de datos no sea la contraseña en texto plano, sino su versión hasheada.
            data.password = hash;
            //Actualiza la contraseña en los datos de actualización con la versión hasheada de la contraseña.
            next();
        } catch (error) {
            next(error);
        }
    }
    next();
}); */

UserSchema.pre(["findOneAndUpdate"], async function (next) {
    const data = this.getUpdate();
    if (data.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(data.password, salt);
            data.password = hash;
            next();
        } catch (error) {
            next(error);
        }
    }
    next();
});


const User = new mongoose.model("User", UserSchema);

module.exports = User;