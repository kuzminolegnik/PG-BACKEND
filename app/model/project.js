module.exports = {

    schema: 'auth',

    methods: {

        read: {
            procedure: 'web_projects_list',
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
            procedure: 'web_projects_edit',
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
            procedure: 'web_projects_edit',
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
            procedure: 'web_projects_del',
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

};