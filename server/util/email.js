const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs/promises");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS

    },
});

module.exports.sendPasswordToken = ({ user, token }) => {

    return new Promise(async (resolve, reject) => {
        try {
            const options = { ...user };
            options.token = token;
            const templateFile = await fs.readFile("./view/email.hbs", "utf-8");
            const template = handlebars.compile(templateFile);
            const html = template(options);

            const info = await transporter.sendMail({
                from: '"Not Reply Pistore" <pistore@example.com>', // sender address
                to: user.email, // list of receivers
                subject: "Password Reset", // Subject line
                text: "Password Reset", // plain text body
                html: html, // html body
            });
            resolve(info);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

