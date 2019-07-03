const mailer = require('nodemailer');

module.exports = function (req, res, next) {
    let app = this,
        config = app.get('config'),
        transporter = mailer.createTransport(config.mail);

    res.sendMail = function (parameters) {
        let {to, subject, html, attachments, success, failure} = parameters;

        transporter.sendMail({
            from: "ICSMonitoring <" + config.mail.auth.user + ">",
            to: to,
            attachments: attachments,
            subject: subject,
            html: html
        }, function (error, response) {
            if (error) {
                failure({
                    status: 500,
                    error: error
                });
                return;
            }
            success(response)
        });

    };

    next();
};