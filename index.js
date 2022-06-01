const core = require('@actions/core');
const github = require('@actions/github');

const { workspaces } = require('./package.json');

try {
    // `files` input defined in action metadata file
    const input = core.getInput('files');
    // We're receiving this stringified, parse it in order to use it as an array
    const changedFiles = Array.isArray(input) ? input : JSON.parse(input);
    console.log(`changed files: ${changedFiles}`);
    const inWorkspace = [];
    changedFiles.forEach((file) => {
        const splitted = file.includes('/')
            ? file.split('/')[0]
            : file.includes('\\') /* support Backslash as well as forward  */
            ? file.split('\\')[0]
            : file;
        if (workspaces.includes(splitted) && !inWorkspace.includes(splitted)) {
            inWorkspace.push(splitted);
        } else {
            // Check custom changes that are ok before throwing ?
            // Like package.json, .github/workflows, ply-cli-config.json
            // Could do with else if
            console.log(`${file} is not in any of the workspaces`);
            // The above log should be:
            // throw new Error('File is not in any of the workspaces');
        }
    });

    const rlsCmd = inWorkspace.reduce(
        (prev, curr) =>
            `${prev.includes('-w') ? prev : `-w ${prev}`}` + ` -w ${curr}`
    );
    console.log('rlsCmd', rlsCmd);
    core.setOutput('release', rlsCmd);

    // Un-necessary ?
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2);
    // console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
