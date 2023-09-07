const {OAuth2Client} = require('google-auth-library');
const config = require('@config');

const client = new OAuth2Client();

async function googleVerify(gtoken) {
  const ticket = await client.verifyIdToken({
      idToken: gtoken,
      audience: config.googleCliendID,
  });
  const { name, picture, email } = ticket.getPayload();

	return {
		name, 
		img: picture, 
		email
	}
}

module.exports = {
	googleVerify
}