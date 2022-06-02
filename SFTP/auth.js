const Client = require('ssh2-sftp-client');
const sftp = new Client('');

const getConnectionName = async ({ input }) => input.config.username || 'SFTP';
const verifyAPI = async (data) => {
    const { host, username, password } = data.authData;
    if (!host || !username || !password) {
        throw new Error('Missing auth data.');
    }
    const config = {
        host,
        username,
        password,
    };

    try {
        const res = await sftp.connect(config);
        return { config: res._client.config };
    } catch (err) {
        // What should happen here ?
        console.log('catched error:');
        throw new Error(err);
    } finally {
        sftp.end();
    }
};

module.exports = {
    type: 'custom',
    config: {
        getConnectionName,
    },
    verifyAPI,
    auth_fields: [
        {
            key: 'host',
            description: 'Hostname/IP',
            type: 'string',
            required: true,
            text: '127.0.0.1',
        },
        {
            key: 'username',
            description: 'Username',
            type: 'string',
            required: true,
            text: 'john_doe',
        },
        {
            key: 'password',
            description: 'Password',
            type: 'string',
            is_password: true,
            required: true,
        },
    ],
};
