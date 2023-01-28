#!/bin/sh

# This script will bootstrap a fresh new project. This includes removal of the screenshots and .git directories. Removes the README and this scriptfile.
# Lastly, it will set a name of choosing for all products.

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm could not be found, please install Node.js and npm first"
    exit
fi

# Clean in case of people already bootstrap the project (dependencies, aka; npm i)
echo 'Cleaning project...'
npm run clean

echo "New desired name for your project:"
read NEWNAME

echo "Replacing all occurrences of 'project-starter' with ${NEWNAME}"
git grep -l 'project-starter' | xargs sed -i '' -e "s/project-starter/${NEWNAME}/g"

echo 'Deleting screenshots/.git/README/bootstrap_project'
rm -rf screenshots
rm -rf .git
rm README.md
rm bootstrap_project.sh

echo "Done! You can now bootstrap all the dependencies using npm i and don't forget to set all .env files correctly! Read the README!"
