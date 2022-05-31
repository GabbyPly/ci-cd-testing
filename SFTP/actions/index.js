const uploadFile = require('./upload_file');
const listDirs = require('./list_dirs');
const listDirContent = require('./list_dir_content');

const actions = {
    [uploadFile.key]: uploadFile,
    [listDirs.key]: listDirs,
    [listDirContent.key]: listDirContent,
};

module.exports = actions;
