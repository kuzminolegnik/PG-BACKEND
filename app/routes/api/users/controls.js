module.exports = function (config) {

    const app = this;
    const RouterHttpApi = app.getRoute('base.http.api');

    return new RouterHttpApi({

        prefix: config['prefix'],

        '[GET]/': function (req, res) {
            let usersControl = app.getModel('db.users.control');

            usersControl.read({
                values: {
                    data: {
                        session_hash: req.getHash(),
                        project_id: req.getContext()
                    }
                },
                callback: res.sendData
            });

        }

    });

};