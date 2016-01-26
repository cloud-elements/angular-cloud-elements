# angular-cloud-elements
An AngularJS Library for interacting with the Cloud Elements Platform APIs

[![npm version](https://badge.fury.io/js/angular-cloud-elements.svg)](https://badge.fury.io/js/angular-cloud-elements) [![Circle CI](https://circleci.com/gh/cloud-elements/angular-cloud-elements.svg?style=shield&circle-token=9a23de117e2792ad4eced80dc32eb6db792bcb00)](https://circleci.com/gh/cloud-elements/angular-cloud-elements)

## Features
- `ceElements` for interacting with Elements and Element Instances APIs
- `ceFormulas` for interacting with Formulas and Formula Instance APIs
- `ceTransformations` for interacting with the Transformations APIs
- `ceBulk` for interacting with the Bulk APIs

## Build
```bash
npm install
npm install -g gulp
npm install -g bower
bower install
gulp build
```
__PROTIP__: `gulp build` creates two distribution files in the `/dist` folder, one concatenated and one minified

## Testing
Tests are run using Karma, mochajs and chai.js

To test files in the `/src` directory:
```bash
gulp test-src
```

To run all tests (runs against `src` and `dist`):
```bash
gulp test
```

## Installation for an Angular project
```bash
npm install angular-cloud-elements --save
```

## Usage
Include the source file available in the `/dist` folder
```html
<script src="node_modules/angular-cloud-elements/dist/angular-cloud-elements.js"></script>
```
A minified version is also provided
```html
<script src="node_modules/angular-cloud-elements/dist/angular-cloud-elements.min.js"></script>
```

Then, in your module include `angularCloudElements`:
```javascript
angular.module('myApp', ['angularCloudElements']);
```
Lastly, set the configs using the `ceAuth` service:
```javascript
angular.module('myApp')
       .controller('myController', ['ceAuth', function(ceAuth) {
         function onLogin() {
           // obtain secrets
           ceAuth.setConfig({
             userSecret: 'a valid user secret',
             orgSecret: 'a valid org secret',
             baseUrl: 'base url of environment you are using'
           });
         }
       }])
```
