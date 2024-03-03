const axios = require('axios');
const _ = require('lodash');

exports.handler = async (context, event, callback) => {
	let twlResponse = new Twilio.Response();
  const pokemonName = event.defaultName;
  // Call species API https://pokeapi.co/api/v2/pokemon-species/{name}
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
    const { data } = response;
    console.log(data)
    let flavorText = _.dropWhile(data.flavor_text_entries, (elem) => elem.language.name !== 'en')[0].flavor_text;
    console.log(flavorText)
    flavorText = flavorText.replace('', " ");
    console.log(flavorText)
      twlResponse// Set the status code to 200 OK
        .setStatusCode(200)
        // Set the Content-Type Header
        .appendHeader('Content-Type', 'application/json')
        // Set the response body
        .setBody({
          flavorText
        })
    console.log(twlResponse)
    return callback(null, twlResponse);
  } catch (err) {
    twlResponse.setStatusCode(404)
    console.log(err)
    return callback(err);
  }
};