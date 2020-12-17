const request = require('request-promise');

const lookup_options = {
    method: 'GET',
    uri: 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup',
    qs: {
      key: 'dict.1.1.20170610T055246Z.0f11bdc42e7b693a.eefbde961e10106a4efa7d852287caa49ecc68cf',
      lang: 'en-en'
    },
    json: true
  }

const fetchWordDetails = async function (word) {
    lookup_options['qs']['text'] = word;
    const details = await request(lookup_options);
    return details;
}

module.exports = fetchWordDetails;
