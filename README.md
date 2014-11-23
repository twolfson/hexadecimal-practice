# hexadecimal-practice [![Build status](https://travis-ci.org/twolfson/hexadecimal-practice.png?branch=master)](https://travis-ci.org/twolfson/hexadecimal-practice)

CLI application for practicing hexadecimal math (e.g. addition)

This was built to make hexadecimal numbers more familiar to work with.

```bash
$ hexadecimal-practice
What is the answer for: 8e + ac? 13a
What is the answer for: 11 + 10?
```

## Getting Started
Install the module globally via npm:

```bash
npm install -g hexadecimal-practice
```

The program can be run via:

```
hexadecimal-practice
# What is the answer for: c0 + 01?
```

## Documentation
### CLI
We provide an executable `hexadecimal-practice` upon installing `hexadecimal-practice`. The options can be found via `--help`:

```bash
$ hexadecimal-practice --help

  Usage: hexadecimal-practice [options]

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    --seed <seed>              Specify a seed to use for number generation
    --maximum-digits <digits>  Specify the maximum amount of digits to use (hexadecimal base)
```

## Examples
### Digits
For hexadecimal novices, 2 digit numbers can be overwhelming. By using `--maximum-digits 1`, we are prompted with single digit hexadecimal numbers:

```bash
$ hexadecimal-practice --maximum-digits 1
What is the answer for: 4 + d? 11
What is the answer for: 6 + 8?
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## Donating
Support this project and [others by twolfson][gratipay] via [gratipay][].

[![Support via Gratipay][gratipay-badge]][gratipay]

[gratipay-badge]: https://cdn.rawgit.com/gratipay/gratipay-badge/2.x.x/dist/gratipay.png
[gratipay]: https://www.gratipay.com/twolfson/

## Unlicense
As of Nov 23 2014, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
