const axios = require('axios');

module.exports = class Sphere {

    /**
     * Represents a SphereEngine Compiler
     * @constructor
     * @param {object} options
     */
    constructor(options) {
        this.isReady = false;
        this.compilersData = {};
        this.onReadyFunctions = [];
        this.endpoint = options.endpoint;
        this.token = options.token;
        this.init();
    }

    /**
     * Initialize stuff
     */
    init() {
        this.getCompilers().then(result => {
            this.compilersData = result.items;
            this.announceReady();
        });
    }

    /**
     * Announces that Sphere is ready and calls all onReady functions
     */
    announceReady() {
        this.isReady = true;
        // runs all ready functins
        for (let readyFunction of this.onReadyFunctions) readyFunction();
    }

    /**
     * Adds a function to onReady functions
     * @param {function} func 
     */
    ready(func) {
        this.onReadyFunctions.push(func);
    }

    /**
     * Get compilerId of language
     * @param {string} language 
     */
    getCompilerId(language) {
        language = language.toLowerCase();
        for (let compiler of this.compilersData) {
            const name = compiler.name.toLowerCase().split(' ')[0];
            const short = compiler.short.toLowerCase().split(' ')[0];
            if (name === language || short === language) return parseInt(compiler.id);
        }
        return null;
    }

    /**
     * Makes a Sphere API v3 request
     * @param {string} method
     * @param {string} path
     * @param {object} data
     */
    request(method, path, data = {}) {
        return new Promise((resolve, reject) => {
            const url = `https://${this.endpoint}/api/v4/${path}?access_token=${this.token}`;
            if (method.toLowerCase() === 'post') return axios.post(url, data).then(response => resolve(response.data));
            return axios.get(url, data).then(response => resolve(response.data));
        });
    }

    /**
     * Gets all compilers
     */
    getCompilers() {
        return this.request('get', 'compilers');
    }

    /**
     * Requests for a Sphere Compile
     * @param {object} options
     */
    compile(options = { language: 'python', source: '' }, timeout = 2000) {
        return new Promise((resolve, reject) => {
            this.request('POST', 'submissions', {
                compilerId: this.getCompilerId(options.language),
                source: options.source
            }).then(order => {
                setTimeout(() => {
                    const resultObj = {};
                    this.request('get', `submissions/${order.id}`).then(response => {
                        // extracting main data
                        resultObj.id = response.id;
                        resultObj.compiler = `${response.compiler.name} (${response.compiler.version.name})`;
                        resultObj.time = response.result.time;
                        resultObj.memory = response.result.memory;

                        // extracting inputs, outputs and errors
                        let extractedCount = 0;
                        for (let param in response.result.streams) {
                            if (!response.result.streams[param] || param === 'source') {
                                extractedCount++;
                                resultObj[param] = null;
                                if (param === 'source') resultObj[param] = options.source;
                            } else {
                                axios.get(response.result.streams[param].uri).then(sourceData => {
                                    extractedCount++;
                                    resultObj[param] = sourceData.data;
                                    if (extractedCount === Object.keys(response.result.streams).length) {
                                        resolve(resultObj);
                                    }
                                }).catch(console.log);
                            }
                        }
                    });
                }, timeout);
            });
        });
    }

};