
const {google} = require('googleapis');

getsheet();


function getsheet() {
sheets = google.sheets('v4');
myClientSercet = {"installed":{"client_id":"286668027989-vqspav9v6eihrsm60gk0n763u1bqal76.apps.googleusercontent.com","project_id":"chatbot-ctu","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://www.googleapis.com/oauth2/v3/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"DbciXO8WlGAN68XTfbCuT6e7","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}};
 oAuth2Client = new google.auth.OAuth2(myClientSercet.installed.client_id, myClientSercet.installed.client_secret, myClientSercet.installed.redirect_uris[0]);
 oAuth2Client.credentials={"access_token":"ya29.GltNBi3elI3WO_MUaY6V7Wm6fuWobUVteycWRNebHp_PEaiYx4RecmiEjw2JSCpUduqxPVXx2ihPCrVZiUI6PXLbp6ls5PnVdK5xpQHICiPElHuH8NnqE5IWqJ6M","refresh_token":"1/p0pc-6xyyT-3B5X1K_s2OpnH2EkYCRYQnUC9uFJtdbA","scope":"https://www.googleapis.com/auth/spreadsheets","token_type":"Bearer","expiry_date":1541581733346};
  MysheetId = '1xRQcUdGFhQCqDHuR4BQbXNl9pF1s26krIEmiG9SQqRM';
var request3 = {
				'spreadsheetId':MysheetId,
				'rang':'sheet2!A7',
				'valuelnputOption':'RAW',
				auth:oAuth2Client,
				'resource':{
					"values":[
					['123','321']
					]
				},
			}; 
			sheets.spreadsheets.values.update(request3);
}
