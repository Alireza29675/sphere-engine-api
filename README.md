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
    endpoint: '<HASH>.compilers.sphere-engine.com',
    token: '<COMPILER_API_TOKEN>'
});

const code = `
#include <iostream>
using namespace std;
int main () {    
    cout << "Hello Sphere";
    return 0;
}
`

sphere.ready(() => {

    sphere.compile({
        language: 'c++',
        source: code
    }, 1000).then(response => {

        console.log(response)
        // Console logs
        // {
        //    id: 67918206,
        //    compiler: 'C++ (5.1.1)',
        //    time: 0,
        //    memory: 15224,
        //    source: '\n#include <iostream>\nusing namespace std;\nint main () {\n\tcout<<"Hello World";\n\treturn 0;\n}\n',
        //    input: null,
        //    error: null,
        //    cmpinfo: null,
        //    output: 'Hello World'
        // }

    })

})

module.exports = Sphere;
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
