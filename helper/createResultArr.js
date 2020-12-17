
const getSynList = (synList) => {
    const formattedList = synList.reduce((acc, synObj) => {
        return [
            ...acc,
            synObj.text
        ]
    }, []);
}

const extractSynForWords = (detail) => {

    const finalSynList = detail.reduce((acc, wordSyn) => {
        const synObj = {
            word: wordSyn.text
        };
        const synList = wordSyn.syn ? getSynList(wordSyn.syn) : [];
        return [
            ...acc,
            {
                ...synObj,
                synonymns: synList
            }
        ]
    }, []);
    return finalSynList;
}

const createResultArr = (detailsList, wordsArray) => {
    const resultArr = [];
    wordsArrLen = wordsArray.length;

    for (let i=0; i<wordsArray.length; i++) {
        currentWordCounter = wordsArray[i]

        // temp object result to store text and counter
        const tempResult = {
            word: currentWordCounter[0],
            output: {
                count: currentWordCounter[1],
            }
        }

        wordDetail = detailsList[i].def[0] || {};

        // add pos for the word to the temp object result
        const updatedTempResultWtPos = {
            ...tempResult,
            output: {
                ...tempResult.output,
                pos: wordDetail.pos || null
            }
        }

        translationDetails = wordDetail.tr || [];
        const fetchedSyn = extractSynForWords(translationDetails);

        // add list of synonymns to the temp object result
        const updatedTempResultWtSyn = {
            ...updatedTempResultWtPos,
            output: {
                ...updatedTempResultWtPos.output,
                synonymns: fetchedSyn
            }
        }
        resultArr.push(updatedTempResultWtSyn);
    };
    return resultArr;
}

module.exports = createResultArr;
