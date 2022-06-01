// code ex from github-hello-world-js-action
const core = require('@actions/core');
const github = require('@actions/github');

try {
    // `files` input defined in action metadata file
    let changedFiles = core.getInput('files');
    console.log(`changed files: ${changedFiles}`);
    changedFiles = changedFiles || `calendly bitly mindee sftp`; // TODO Delete me
    const integrationsMaybe = changedFiles.split(' ');
    console.log('integrationsMaybe', integrationsMaybe);
    const y = changedFiles.split('/');
    console.log('y', y);

    const separatedWithDashW = integrationsMaybe.map(
        (integration) => ` -w ${integration}`
    );
    const integrationsToRelease = separatedWithDashW.join('');
    console.log('integrationsToRelease', integrationsToRelease);
    const releaseCmd = `npm run release-app ${integrationsToRelease}`;
    core.setOutput('release', releaseCmd);

    // Un-necessary ?
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
