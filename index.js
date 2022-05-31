const core = require('@actions/core');

const myInput2 = core.getInput('changed_files', { required: false });
console.log('myInput2', myInput2);
const myInput3 = core.getInput('changed_files_two', { required: true });
console.log('myInput3', myInput3);
// const myInput3 = core.getInput('INPUT_FAM_NAME', { required: true }); // does not work

// TODO strong chance that we will require a multiLineInput
// const myMultilineInput = core.getMultilineInput('multilineInputName', {
//     required: true,
// });

// These will be passed in the above step
const calendly = '/Users/gabrielmillatiner/dev/ply-app-integrations/calendly';
const bitly = '/Users/gabrielmillatiner/dev/ply-app-integrations/bitly';
const mindee = '/Users/gabrielmillatiner/dev/ply-app-integrations/mindee';

const array = [calendly, bitly, mindee];

// should return the command itself already, something such as:
// npm run release-app-staging -w bitly -w one-drive

core.setOutput('outputKey', array.join(' '));
// core.setOutput('release_cmd', array.join(' '));
