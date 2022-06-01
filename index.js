const core = require('@actions/core');
// const github = require('@actions/github');

const { workspaces } = require('./package.json');
const env = 'staging';

try {
    // `files` input defined in action metadata file
    const input = core.getInput('files');
    // We're receiving this stringified, parse it in order to use it as an array
    const changedFiles = Array.isArray(input) ? input : JSON.parse(input);
    console.log(`changed files: ${changedFiles}`);
    const inWorkspace = [];
    changedFiles.forEach((file) => {
        let integration;
        if (file.includes('/')) {
            integration = file.split('/')[0];
        } else if (file.includes('\\')) {
            /* Should support Backslash as well as forward ?*/
            file.split('\\')[0];
        } else {
            // TODO could address root folders files here such as package.json (readme, .gitignore, .env, That's it ? )
            // Shouldn't
            // integration = file;
        }

        if (
            workspaces.includes(integration) &&
            !inWorkspace.includes(integration)
        ) {
            inWorkspace.push(integration);
        } else {
            // Could do with else if that checks custom changes that are ok before throwing ?
            // for example: package.json, .github/workflows
            if (inWorkspace.includes(integration)) {
                console.log(
                    `Already added ${integration} to integrations that will be released`
                );
            }
            console.log(`${file} is not in any of the workspaces`);
            // The above log should be:
            // throw new Error('File is not in any of the workspaces');
        }
    });

    const appendToCmd = inWorkspace.reduce(
        (prev, curr) =>
            `${prev.includes('-w') ? prev : `-w ${prev}`}` + ` -w ${curr}`
    );
    console.log('appendToCmd', appendToCmd);
    core.setOutput('release', `npm run release-app-${env} ${appendToCmd}`);
} catch (error) {
    core.setFailed(error.message);
}

// Un-necessary ?
// Get the JSON webhook payload for the event that triggered the workflow
// const payload = JSON.stringify(github.context.payload, undefined, 2);
// console.log(`The event payload: ${payload}`);
