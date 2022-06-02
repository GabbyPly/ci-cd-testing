const { DIRECTORY_NAME, DIRECTORY_PATH } = require('./consts');

const downloadFile = async ({ url, fetch }) => {
    const res = await fetch(url);
    const buffer = await res.buffer();
    return buffer;
};
const getConfigData = ({ testResponse }) => {
    const { host, password, username } = testResponse.config;
    return {
        host,
        username,
        password,
    };
};

function getFinalPath(folderName) {
    if (folderName === DIRECTORY_NAME || !folderName) {
        return DIRECTORY_PATH;
    }
    return `${folderName}/`;
}

module.exports = { downloadFile, getConfigData, getFinalPath };
