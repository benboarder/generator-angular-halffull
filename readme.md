# Halffull AngularJS generator [![Build Status](https://secure.travis-ci.org/benboarder/generator-angular-halffull.svg?branch=master)](http://travis-ci.org/benboarder/generator-angular-halffull)

> Yeoman generator for AngularJS extended with extra tools and goodies


## Usage

Install `generator-angular-halffull`:
```
npm install -g generator-angular-halffull
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo angular-halffull`, optionally passing an app name:
```
yo angular-halffull [app-name]
```

Run `grunt` for building
Run `grunt serve` for preview
Run `grunt test` for testing
Run `grunt push` for deployment and live testing
Run `grunt extra` for misc tasks such as uncss

## Configuration
Yeoman generated projects can be further tweaked according to your needs by modifying project files appropriately.

## Extension
Added to this extension of generator-angular are the following modules:
`htmlhint`
`uncss`
`pagespeed`

## Testing

Running `grunt test` will run the unit tests with karma.

## Pushing

Running `grunt push` pushes your 'dist' files to your ftp server.
It then runs Google pagespeed tests on the deployed files; both for mobile and for desktop.

## Extra

Running `grunt extra` runs your CSS through UNCSS, deleting any css classes not being used by your HTML pages.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
