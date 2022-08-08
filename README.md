# generator-jhipster-ngxadmin

> JHipster blueprint, ngxadmin blueprint for JHipster

[![NPM version][npm-image]][npm-url]
[![Generator][github-generator-image]][github-generator-url]
[![Integration Test][github-integration-image]][github-integration-url]

# Introduction

This is a [JHipster](https://www.jhipster.tech/) blueprint, that is meant to be used in a JHipster application.
It adds for angular client the [ngx-admin v8.0.0 template](https://github.com/akveo/ngx-admin/tree/v8.0.0)

# Prerequisites

As this is a [JHipster](https://www.jhipster.tech/) blueprint, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://www.jhipster.tech/installation/)

Please attention that it is tested for `Jhipster v7.8.1`

# Installation

To install or update this blueprint:

```bash
npm install -g generator-jhipster-ngxadmin
```

# Development

To contribute and test locally the blueprint, After download this repo, execute on root folder:

```bash
npm link
```

Then create out of this repo an empty folder, in order to run the generation:

```bash
npm link generator-jhipster-ngxadmin
```

# Usage

To use this blueprint, run the below command

```bash
jhipster --blueprints ngxadmin
```

You can look for updated ngxadmin blueprint specific options by running

```bash
jhipster app --blueprints ngxadmin --help
```

And looking for `(blueprint option: ngxadmin)` like

However, you can run the blueprint with its `cli command`:

```bash
jhipster-ngxadmin
```

## Pre-release

To use an unreleased version, install it using git.

```bash
npm install -g jhipster/generator-jhipster-ngxadmin#main
jhipster --blueprints ngxadmin --skip-jhipster-dependencies
```

## To DO:

- fix node (14.20.0) and npm versions (6.14.17) in pom.xml
- check templates under **webapp/app**
- define properties to skip tests and jhipster angular themes
- the blueprint enables only oauth2 chooice

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-ngxadmin.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-ngxadmin
[github-generator-image]: https://github.com/jhipster/generator-jhipster-ngxadmin/actions/workflows/generator.yml/badge.svg
[github-generator-url]: https://github.com/jhipster/generator-jhipster-ngxadmin/actions/workflows/generator.yml
[github-integration-image]: https://github.com/jhipster/generator-jhipster-ngxadmin/actions/workflows/integration.yml/badge.svg
[github-integration-url]: https://github.com/jhipster/generator-jhipster-ngxadmin/actions/workflows/integration.yml
