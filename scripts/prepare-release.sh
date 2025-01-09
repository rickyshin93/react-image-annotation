#!/bin/bash

# Check if there are changes to commit
if git diff-index --quiet HEAD --; then
    echo "No changes to commit, proceeding with release..."
else
    git add .
    echo "Enter commit message:"
    read commit_msg
    git commit -m "$commit_msg"
fi

# Ensure we're up to date with remote
git pull origin main --rebase

# Check for errors
if [ $? -ne 0 ]; then
    echo "Error: Failed to pull latest changes"
    exit 1
fi 