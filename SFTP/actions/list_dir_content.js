const Client = require('ssh2-sftp-client');
const { getFinalPath } = require('../utils');

const { DIRECTORY_PATH } = require('../consts');

const sftp = new Client('');

const listDirContent = async (d) => {
    const { folderName } = d.input;
    const { host, password, username } = d.testResponse.config;

    const finalPath = getFinalPath(folderName);

    const config = {
        host,
        username,
        password,
    };

    try {
        await sftp.connect(config);
        const res = await sftp.list(finalPath);
        const listWithFullPaths = res.map((file) => ({
            ...file,
            path: `./${finalPath}/${file.name}`,
        }));
        const includingRootDir = [
            { name: 'My directory', path: DIRECTORY_PATH },
            ...listWithFullPaths,
        ];
        return { results: includingRootDir };
    } catch (err) {
        // What should happen here ?
        console.log('catched error:');
        throw new Error(err);
    } finally {
        sftp.end();
    }
};

const sampleData = {};

module.exports = {
    key: 'list_dir_content',
    noun: 'directory',
    title: 'List directory content',
    type: 'read',
    params: [
        {
            key: 'folderName',
            name: 'Destination folder',
            description: '🔄 Refresh to display nested folders',
            type: 'string',
            required: false,
            source: 'list_dirs',
        },
    ],
    handler: listDirContent,
    sample: sampleData,
    ac_mappings: { option: 'name', value: 'path' },
};
