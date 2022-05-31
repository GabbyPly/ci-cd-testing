const Client = require('ssh2-sftp-client');
const sftp = new Client('');

const { downloadFile, getConfigData } = require('../utils');

const uploadFile = async (d) => {
    const { fetch } = d.libs;
    const { url, fileName, folderName: folderPath } = d.input;
    const fileContent = await downloadFile({ fetch, url });
    const config = getConfigData(d);
    const filePath = `${folderPath}/${fileName}`;
    try {
        await sftp.connect(config);
        await sftp.put(fileContent, filePath);
        return { success: true };
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
    key: 'upload_file',
    noun: 'file',
    title: 'Upload a file',
    type: 'write',
    params: [
        {
            key: 'url',
            name: 'Url of a file to upload',
            type: 'string',
            required: true,
        },
        {
            key: 'fileName',
            name: 'File name',
            type: 'string',
            required: true,
        },
        {
            key: 'folderName',
            name: 'Directory you wish to upload to',
            type: 'string',
            required: true,
            source: 'list_dirs',
        },
    ],
    handler: uploadFile,
    sample: sampleData,
};

// async function getNestedFolders(data) {
//     const params = [];

//     return params;
// }
