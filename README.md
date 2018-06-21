<h1 align="center"> Cascade CLI </h1>


## Description :
Cascade adds Git merge automation via the command line.

Currently Cascade only supports merging not rebasing, and by default does not fast-forward `--no-ff` the HEAD before applying changes. `--no-ff` adds a commit for the merge, and creates a more readable Git tree. Also Cascade does not support diffing of files or any conflict resolution beyond the Git 3-way auto-merge.


## Installation :

```bash
npm i -g casade-cli 
```

## Usage :

````bash
cascade merge <fromBranch> <toBranch> <toBranch...>
````

##### Example :

````bash
cascade merge feature develop master
````

##### Shorthand Example :

````bash
cc m feature develop master
````