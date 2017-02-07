# node-mcfg [![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] [![Test coverage][coveralls-image]][coveralls-url]

> Node.js multi-file configuration reader

## Installation

    npm install --save mcfg

## Usage

    const load = require('mcfg')
    const config = load(__dirname + '/server/config')

## Credit

This project forked from [sailsjs](https://github.com/balderdashy/sails/blob/5953c2328d465837f86dfe56761991c5cf456748/lib/hooks/moduleloader/index.js#L127) user local configuration loader.

## License

MIT

[npm-image]: https://img.shields.io/npm/v/mcfg.svg?style=flat
[npm-url]: https://npmjs.org/package/mcfg
[travis-image]: https://img.shields.io/travis/CatTail/node-mcfg.svg?style=flat
[travis-url]: https://travis-ci.org/CatTail/node-mcfg
[coveralls-image]: https://img.shields.io/coveralls/CatTail/node-mcfg.svg?style=flat
[coveralls-url]: https://coveralls.io/r/CatTail/node-mcfg?branch=master
