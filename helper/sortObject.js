const sortObject = function (wordCount) {
    const wordCountArray = Object.keys(wordCount).map(function(key) {
        return [key, wordCount[key]];
      });
    wordCountArray.sort((first, second) => {
        return second[1] - first[1];
    });
    // return top 10
    return wordCountArray.slice(0, 10);
}

module.exports = sortObject;
