module.exports = function () {

    const app = this;
    const ModelDB = app.getModel('base.db');

    return new ModelDB({

        schema: 'auth',

        methods: {

            read: {
                procedure: 'web_procedures_user_list',
                arguments: [
                    {
                        name: 'data',
                        defaultValue: null
                    }
                ]
            }

        }

    });

};