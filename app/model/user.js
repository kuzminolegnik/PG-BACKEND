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
                    name: 'login',
                    type: 'string',
                    defaultValue: null
                }
            ]
        }

    }

};