const downloadFile = async ({ url, fetch }) => {
    const resp = await fetch(url);
    return resp.body;
};

module.exports = { downloadFile };
