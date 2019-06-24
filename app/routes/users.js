module.exports = {

    '[GET]/': function (req, res) {
        let user = this.getModel('user');

        user.read({
            values: {
                session: req.getHash(),
                data: {
                    project_id: req.getContext(),
                }
            },
            callback: res.sendData
        });

    },

    '[GET]/:id': function (req, res) {
        let user = this.getModel('user');

        user.read({
            values: {
                session: req.getHash(),
                data: {
                    project_id: req.getContext(),
                    id: req.params["id"]
                }
            },
            callback: function (metaData) {

                metaData['result'] = metaData['result'] ? metaData['result'][0] : null;

                res.sendData(metaData);
            }
        });

    },

    '[POST]/': function (req, res) {
        let user = this.getModel('user'),
            md5 = require('md5'),
            tmp = md5(req.body['login'] + Math.random()).substr(0, 5);

        delete req.body['id'];

        user.edit({
            values: {
                session: req.getHash(),
                data: {
                    tmp: tmp,
                    project_id: req.getContext(),
                    roles_id: req.body['roles_id'] || null,
                    phone: req.body['phone'],
                    patronymic: req.body['patronymic'],
                    surname: req.body['surname'],
                    login: req.body['login'],
                    name: req.body['name']
                }
            },
            callback: function (metaData) {

                let record = metaData['result'] ? metaData['result'][0] : null,
                    url = require('url'),
                    link = url.format({
                        host: req.headers['x-service-host'],
                        pathname: '/users/approve/mail/' + record['email_hash'],
                        query: {
                            referer: req.headers['referer']
                        }
                    });

                metaData['result'] = record;

                if (record) {

                    res.sendMail({
                        to: record['login'],
                        subject: 'Approve your Mail',
                        html:
                            '<b>login:</b> ' + record['login'] + '<br>' +
                            '<b>Password:</b> ' + tmp + '<br>' +
                            '<a href="' + link + '">Click to Approve your mail</a>'
                    });
                }

                res.sendData(metaData);
            }
        });
    },

    '[PUT]/:id': function (req, res) {
        let user = this.getModel('user');

        user.edit({
            values: {
                session: req.getHash(),
                data: {
                    id: Number(req.params["id"]),
                    project_id: req.getContext(),
                    roles_id: req.body['roles_id'] || null,
                    phone: req.body['phone'],
                    patronymic: req.body['patronymic'],
                    surname: req.body['surname'],
                    login: req.body['login'],
                    name: req.body['name']
                }
            },
            callback: function (metaData) {

                metaData['result'] = metaData['result'] ? metaData['result'][0] : null;

                res.sendData(metaData);
            }
        });
    },

    '[DELETE]/:id': function (req, res) {
        let user = this.getModel('user');

        user.delete({
            values: {
                session: req.getHash(),
                id: req.params["id"]
            },
            callback: function (metaData) {

                metaData['result'] = metaData['result'] ? metaData['result'][0] : null;

                res.sendData(metaData);
            }
        });
    },

    '[GET]/approve/mail/:hash': function (req, res) {
        let user = this.getModel('user');

        user.approved({
            values: {
                session: req.params["hash"]
            },
            callback: function (metaData) {
                if (metaData['success']) {
                    res.redirect(req.query['referer']);
                }
                else {
                    res.send(metaData['message']);
                }

            }
        });

    },

};