# Sphere Engine Node API
Sphere Engine API npm package

## Installation
```bash
$ npm i --save sphere-engine
```

## Usage
```javascript
const Sphere = require('sphere-engine')

const sphere = new Sphere({
    token: '<TOKEK_API>'
})

sphere.compile({
    language: 'c++',
    source: '#include <stdio.h>\n int main(){ // some code }'
}).then(result => {
    console.log(result);
});
```

## Scripts
* `npm run compile` - Compiles source files to disk (~/lib).
* `npm run compile:watch` - Same as `npm run compile` but watches files for changes.
* `npm run lint` - Lints source and test files.
* `npm run lint:fix` - Lints files and attempts to fix any issues.
* `npm run test` - Runs unit tests.
* `npm run test:watch` - Same as `npm test` but watches files for changes.
* `npm run test:cov` - Generates a test coverage report.

## Distribution
Execute one of the following commands
```bash
npm version patch
npm version minor
npm version major
```
## License
MIT
