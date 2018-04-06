const Sphere = require('./lib')

const sphere = new Sphere({ token: '' });

sphere.compile({
    language: 'c++',
    source: '#include <stdio.h>\n int main(){ // some code }'
}).then(result => {
    console.log(result);
});

module.exports = Sphere;