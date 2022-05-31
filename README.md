# Act cheat sheet

Hello

#### List the actions for the default event:

act -l

#### List the actions for a specific event:

act workflow_dispatch -l

#### Run the default (`push`) event:

act

#### Run a specific event:

act pull_request

#### Run a specific job:

act -j test

#### Run in dry-run mode:

act -n
