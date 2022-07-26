require("dotenv").config();
const { NetworkContext } = require("twilio/lib/rest/supersim/v1/network");
const config = require("../config");
const client = require("twilio")(config.accountSid, config.authToken);

const sendMessage = async (codigo) => {
  try {
    console.log("hola");
    const message = await client.messages.create({
      to: "+51963876861",
      from: "+19785033349",
      body: `¡Su solicitud Ha sido Registrada con éxito! Su código de solicitud es: ${codigo}. Por favor, mantengo este código seguro. La municipalidad de chosica nunca solicitará su código de validación.`,
    });
    console.log(message.sid);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMessage };
