module.exports = {

    schema: 'auth',

    methods: {

        read: {
            procedure: 'web_controls_user_list',
            arguments: [
                {
                    name: 'data',
                    defaultValue: null
                }
            ]
        }

    }

};