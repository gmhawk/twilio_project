exports.handler = function(context, event, callback) {
  const twlResponse = new Twilio.Response();
  const isShiny = event.isShiny;
  console.log(typeof isShiny);
  console.log("isShiny ", isShiny);

  const num1 = isShiny === "true" ? Math.floor(Math.random() * 10) + 1 : Math.floor(Math.random() * 100)
  const num2 = isShiny === "true" ? Math.floor(Math.random() * 10) + 1 : Math.floor(Math.random() * 100)
  const answer = isShiny === "true" ? num1 * num2 : num1 + num2;

  twlResponse
  .setStatusCode(200)
  .appendHeader('Content-Type', 'application/json')
  .setBody({
    num1,
    num2,
    answer
  })
  console.log('<problem generated>')
  return callback(null, twlResponse);
};



