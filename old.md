# Origignal main.yml, now something.yml

// prettier-ignore

name: Gabby testing github workflows

on:
pull_request:
branches: - main
push:
branches: - main - trail
jobs:
gabby-first-job:
runs-on: ubuntu-latest
name: gabby-job name
steps: - name: Check out repo
uses: actions/checkout@v3
with:
fetch-depth: 0 - id: files
name: HeyMateski
uses: jitterbit/get-changed-files@v1
with:
format: 'json' - run: |
for changed_file in ${{ steps.files.outputs.all }}; do
echo "Do something with this ${changed_file}."
done - name: node action
id: nodejs
uses: ./folder
with:
changed_files: ${steps.files.outputs.all}
changed_files_two: ${{  steps.files.outputs.all  }}