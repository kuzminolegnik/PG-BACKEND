module.exports = function () {

    const app = this;
    const ModelDB = app.getModel('base.db');

    return new ModelDB({

        schema: 'auth',

        methods: {

            read: {
                procedure: 'web_controls_list',
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

            create: {
                procedure: 'web_controls_edit',
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
                procedure: 'web_controls_edit',
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
                procedure: 'web_controls_del',
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
            }

        }

    });

};