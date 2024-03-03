
const axios = require('axios');
const _ = require('lodash');

exports.handler = async (context, event, callback) => {
	const twlResponse = new Twilio.Response();
  let userMessage = event.msg.toLowerCase();
  
  // URL: https://pokeapi.co/api/v2/pokemon/{name/id}
  if(userMessage === 'x') {
    userMessage = Math.floor(Math.random() * 1026) + 1;
  }
  
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${userMessage}`)
    const { data } = response;
    const shinyChance = Math.floor(Math.random() * 10);
    const isShinyPokemon = shinyChance <= 4;
    const spriteData = isShinyPokemon ? data.sprites.other.home.front_shiny : data.sprites.other.home.front_default;
    const pokeName = isShinyPokemon ? `shiny ${_.capitalize(data.name)}` : _.capitalize(data.name);
    console.log(data)
      twlResponse// Set the status code to 200 OK
        .setStatusCode(200)
        // Set the Content-Type Header
        .appendHeader('Content-Type', 'application/json')
        // Set the response body
        .setBody({
          defaultName: data.name,
          name: pokeName,
          sprite: spriteData,
          isShiny: isShinyPokemon
        })
    console.log(twlResponse)
    return callback(null, twlResponse);
  } catch (err) {
    twlResponse.setStatusCode(404)
    console.log(err)
    return callback(err);
  }
};