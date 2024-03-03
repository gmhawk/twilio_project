exports.handler = function(context, event, callback) {
  let twlResponse = new Twilio.Response();
  let userAnswer;
  if(Boolean(event.retryAnswer)) {
    userAnswer = event.retryAnswer;
  } else {
    userAnswer = event.userAnswer;
  }
  let actualAnswer = event.actualAnswer;
  console.log('event.isShiny ', typeof event.isShiny);
  console.log(`event.userAnswer = ${event.userAnswer} | event.retryAnswer = ${event.retryAnswer}`)

  if(Number(userAnswer) === Number(actualAnswer) || (userAnswer === 'M' || userAnswer === 'm')) {
    twlResponse.setStatusCode(200)
    .appendHeader('Content-Type', 'application/json')
    .setBody({
      normalCaught: event.isShiny === "true" ? Number(event.normalCaught) : Number(event.normalCaught) + 1,
      shinyCaught: event.isShiny === "true" ? Number(event.shinyCaught) + 1 : Number(event.shinyCaught),
      masterBallCount: (userAnswer === 'M' || userAnswer === 'm') ? Number(event.masterBallRemaining - 1) : Number(event.masterBallRemaining),
    })
  } else {
    twlResponse.setStatusCode(400)
  }

  return callback(null, twlResponse);
};