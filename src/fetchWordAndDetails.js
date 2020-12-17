const http = require('http');
const fs = require('fs');
const counterStream = require('../helper/counterStream');
const sortObject = require('../helper/sortObject');
const fetchWordDetails = require('../helper/fetchWordDetails');
const createResultArr = require('../helper/createResultArr');


const wordCounterStream = new counterStream();

// create a promise arr to get details of the word
const promiseWordDetails = (wordsArray) => {
    const promiseWordDetailsArr = [];
    wordsArray.forEach((wordArr) => {
        promiseWordDetailsArr.push(fetchWordDetails(wordArr[0]))
    })
    return promiseWordDetailsArr;
}

const fetchWordAndDetails = () => {
    http.get('http://norvig.com/big.txt', function (res) {
        res.pipe(wordCounterStream)
    });

    let wordDetails = [];
    wordCounterStream.on('counter', async function (count) {

        // get top 10 words after sorting words
        const sortedArrayWords = sortObject(count);

        const detailsPromise = promiseWordDetails(sortedArrayWords);

        // resolve promise arr for details of the word
        wordDetails = await Promise.all(detailsPromise);

        res = createResultArr(wordDetails, sortedArrayWords);
        fs.writeFileSync('output.json', JSON.stringify(res));
    });
};

module.exports = fetchWordAndDetails;