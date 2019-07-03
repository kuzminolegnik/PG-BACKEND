module.exports = function () {

    const app = this;
    const ModelDB = app.getModel('base.db');

    return new ModelDB({

        schema: 'auth',

        methods: {

            record: {
                procedure: 'session_check',
                arguments: [
                    {
                        name: 'session',
                        type: 'string',
                        defaultValue: null
                    }
                ]
            },

            destroy: {
                procedure: 'logout',
                arguments: [
                    {
                        name: 'session',
                        type: 'string',
                        defaultValue: null
                    }
                ]
            },

            create: {
                procedure: 'logon',
                arguments: [
                    {
                        name: 'login',
                        type: 'string',
                        defaultValue: null
                    },
                    {
                        name: 'password',
                        type: 'string',
                        defaultValue: null
                    }
                ]
            }

        }

    });

};