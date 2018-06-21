<p align="center"><img width=40% src="https://github.com/jasonrhaddix/cascade-cli/blob/master/cc-logo.png"></p>


## Overview
Cascade adds Git merge automation via the command line, and seeks to streamline your workflow.


#### A common Git workflow pattern
```bash
git add -A
git commit -m "message"
git checkout dev
git pull origin dev
git merge --no-ff feature -m "Merged 'feature' into dev"
git push origin dev
git checkout master
git pull origin master
git merge --no-ff dev -m "Merged 'dev' into master"
git push origin master
```

<p align="left"><img width=60% src="https://github.com/jasonrhaddix/cascade-cli/blob/master/cc-tree.png"></p> 

More or less, this is a familiar pattern when working on a project with multiple branches.

#### A Cascade equivalent
```bash
git add -A
git commit -m "message"
cascade merge feature dev master
```

Currently Cascade only supports merging not rebasing, and by default does not fast-forward `--no-ff` the HEAD before applying changes. `--no-ff` adds a commit for the merge, and creates a more readable Git tree. Also Cascade does not support diffing of files or any conflict resolution beyond the Git 3-way auto-merge.


## Installation
To use Cascade in any directory be sure to globally
```bash
npm i -g casade-cli 
```

## Usage

````bash
cascade merge <fromBranch> <toBranch> <toBranch...>
````

## Example

````bash
cascade merge feature develop master
````

#### Shorthand Example 

````bash
cc m feature develop master
````