<p align="center"><img width=40% src="https://raw.githubusercontent.com/jasonrhaddix/cascade-cli/master/cc-logo.png"></p>


## Overview
Cascade adds Git merge automation via the command line, and seeks to streamline your workflow. 

With Cascade you can:
* __Create__ a local and remote repo with multiple branches with one command `cascade create <repoName> [branches...]`
* __Merge__ and push multiple branches with one command `cascade merge <head> <toBranches...>`






## Installation
To use Cascade in any directory be sure to install globally.

```bash
npm i -g casade-cli 
```






## Create
Creating a repo is done using the `create` command in a new folder. Cascade will initialize a local repository, generate and commit a README file, then create a remote repository.


##### Usage
````bash
cascade create <repoName> [branches...]
````

`<head>` refers to the HEAD pointer - usually your current branch. `<toBranches...>` refers to at least one or more required branches to merge to. You can chain on more branches to merge separated by a space.  


##### Example
````bash
cascade create my_project develop feature
````

By default, when creating a repository, a `master` mainline branch will be created. When adding optional branches, each branch will be created off of the mainline branch (master) 


##### Shorthand Example
````bash
cc m feature develop master 
````






## Merge
Merging branches with the `merge` command. Cascade will handle pulling, merging, and pushing of branches on the repo.


##### Common Git workflow pattern
```bash
git add -A
git commit -m "message"
git checkout develop
git pull
git merge --no-ff feature -m "Merged 'feature' into develop"
git push
git checkout master
git pull
git merge --no-ff develop -m "Merged 'develop' into master"
git push
```

<p align="left"><img width=60% src="https://raw.githubusercontent.com/jasonrhaddix/cascade-cli/master/cc-tree.png"></p> 

More or less, this is a familiar pattern when working on a project with multiple branches.


##### Cascade equivalent
```
git add -A
git commit -m "message"
cascade merge feature develop master
```


__NOTE:__ _Currently Cascade only supports merging not rebasing, and by default sets the Fast-Forward flag to false `--no-ff`. `--no-ff` creates a more readable Git tree, but will add a commit for the merge.  Also Cascade does not currently support diffing of files or any conflict resolution beyond the Git 3-way auto-merge._


##### Usage
````bash
cascade merge <head> <toBranches...>
````

`<head>` refers to the HEAD pointer. `<toBranches...>` refers to at least one or more required branches to merge. You can chain more branches to merge separated by a space.  


##### Example
````bash
cascade merge feature develop master
````


##### Shorthand Example
````bash
cc m feature develop master 
````






#### Upcoming Features
- Ability to set default merge parameters