module.exports = {

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
        }

    }

};