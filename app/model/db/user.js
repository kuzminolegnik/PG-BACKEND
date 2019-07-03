module.exports = function () {

    const app = this;
    const ModelDB = app.getModel('base.db');

    return new ModelDB({

        schema: 'auth',

        methods: {

            read: {
                procedure: 'web_members_list',
                arguments: [
                    {
                        name: 'session',
                        type: 'string',
                        defaultValue: null
                    },
                    {
                        name: 'data',
                        defaultValue: null
                    }
                ]
            },

            edit: {
                procedure: 'web_members_edit',
                arguments: [
                    {
                        name: 'session',
                        type: 'string',
                        defaultValue: null
                    },
                    {
                        name: 'data',
                        defaultValue: null
                    }
                ]
            },

            delete: {
                procedure: 'web_members_del',
                arguments: [
                    {
                        name: 'session',
                        type: 'string',
                        defaultValue: null
                    },
                    {
                        name: 'id',
                        defaultValue: null
                    }
                ]
            },

            approved: {
                procedure: 'email_hash_check',
                arguments: [
                    {
                        name: 'session',
                        type: 'string',
                        defaultValue: null
                    }
                ]
            }

        }

    });

};