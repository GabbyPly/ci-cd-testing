const sampleData = {};

const createBitlink = async (data) => {
    const { fetch } = data.libs;
    const { long_url, title } = data.input;
    const url = 'https://api-ssl.bitly.com/v4/bitlinks';
    const body = title ? { long_url, title } : { long_url };
    const r = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    });
    return r.json;
};

module.exports = {
    key: 'create_bitlink',
    noun: 'bitlink',
    title: 'Create a bitlink',
    type: 'write',
    params: [
        {
            key: 'long_url',
            name: 'URL you wish to shorten',
            type: 'string',
            required: true,
        },
        {
            key: 'title',
            name: 'Custom title for your shortened url',
            type: 'string',
            required: false,
        },
    ],

    handler: createBitlink,
    sample: sampleData,
};
