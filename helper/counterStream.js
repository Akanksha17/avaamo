const Writable = require('stream').Writable
const util = require('util')

util.inherits(counterStream, Writable);


function counterStream(options) {
    Writable.call(this, options);
    this.counter = {};
}

const string_split_to_words = function (str) {
    return str.match(/\b(\w+)\b/g)
}

const word_counter = function (words_array, counter) {
    words_array.forEach((word) => {
        if (counter[word]) {
            counter[word] += 1;
        } else {
            counter[word] = 1;
        }
        // console.log('word', word);
    });
    return counter;
}

counterStream.prototype._write = function (chunk, encoding, cb) {
    const line = chunk.toString();
    const line_array = string_split_to_words(line);
    this.counter = word_counter(line_array, this.counter);
    cb();
}

counterStream.prototype.end = function() {
    this.emit('counter', this.counter);
}

module.exports = counterStream;