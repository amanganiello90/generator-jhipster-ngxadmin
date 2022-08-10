# generator-jhipster-ngxadmin

> JHipster blueprint, ngxadmin blueprint for JHipster

[![NPM version][npm-image]][npm-url]
[![Generator][github-generator-image]][github-generator-url]
[![Integration Test][github-integration-image]][github-integration-url]

# Introduction

This is a [JHipster](https://www.jhipster.tech/) blueprint, that is meant to be used in a JHipster application.
It adds an angular client with the [ngx-admin v8.0.0 template](https://github.com/akveo/ngx-admin/tree/v8.0.0), inheriting standard prompt but with the following options customization:

- Only monolith or gateway chooices
- Only security oauth2
- Without client test frameworks
- Without client options (angular ngx template is applied in any case)
- Applied alwayis admin UI

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

And looking for `(blueprint option: ngxadmin)` like.

However, it also ships with an `jhipster-ngxadmin` CLI that you can use as a shortcut.

✅ General App generation

- `jhipster-ngxadmin`

✅ Entity generation

- `jhipster-ngxadmin entity <entity-name>`

✅ JDL Entity model support generation

- `jhipster-ngxadmin import-jdl <my-file.jdl>`

Besides, you can also run the blueprint on a standard jhipster app, because it will regenerate the project adding the ngx template and configuration.

## Pre-release

To use an unreleased version, install it using git.

```bash
npm install -g jhipster/generator-jhipster-ngxadmin#main
jhipster --blueprints ngxadmin --skip-jhipster-dependencies
```

# To DO:

- Support more options (no fixed questions on security, admin UI, and so on)
- Check and manage i18n and entity on header.component

# License

Apache-2.0 © [Angelo Manganiello](https://github.com/amanganiello90)

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-ngxadmin.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-ngxadmin
[github-generator-image]: https://github.com/amanganiello90/generator-jhipster-ngxadmin/actions/workflows/generator.yml/badge.svg
[github-generator-url]: https://github.com/amanganiello90/generator-jhipster-ngxadmin/actions/workflows/generator.yml
[github-integration-image]: https://github.com/amanganiello90/generator-jhipster-ngxadmin/actions/workflows/integration.yml/badge.svg
[github-integration-url]: https://github.com/amanganiello90/generator-jhipster-ngxadmin/actions/workflows/integration.yml
