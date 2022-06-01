// code ex from github-hello-world-js-action
const core = require('@actions/core');
const github = require('@actions/github');

try {
    // `files` input defined in action metadata file
    const changedFiles = core.getInput('files');
    console.log(`changed files: ${changedFiles}`);
    const integrationsMaybe = changedFiles.split(' ');
    console.log('integrationsMaybe', integrationsMaybe);
    const y = changedFiles.split('/');
    console.log('y', y);

    const integrationsToRelease = maybeRlsCmd.join(' -w ');
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
