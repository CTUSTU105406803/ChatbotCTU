const linebot = require('linebot');
const express = require('express');
const {google} = require('googleapis');

const bot = linebot({
	channelId: process.env.CHANNEL_ID,
	channelSecret: process.env.CHANNEL_SECRET,
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

//URL:https://ctuchatbot.herokuapp.com/linewebhook

const app = express();

const linebotParser = bot.parser();

app.get('/',function(req,res){
    res.send('Hello World!');
});

app.post('/linewebhook', linebotParser);
getsheet();


//導入試算表
function getsheet() {
sheets = google.sheets('v4');
myClientSercet = {"installed":{"client_id":"286668027989-vqspav9v6eihrsm60gk0n763u1bqal76.apps.googleusercontent.com","project_id":"chatbot-ctu","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://www.googleapis.com/oauth2/v3/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"DbciXO8WlGAN68XTfbCuT6e7","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}};
 oAuth2Client = new google.auth.OAuth2(myClientSercet.installed.client_id, myClientSercet.installed.client_secret, myClientSercet.installed.redirect_uris[0]);
 oAuth2Client.credentials={"access_token":"ya29.GltNBi3elI3WO_MUaY6V7Wm6fuWobUVteycWRNebHp_PEaiYx4RecmiEjw2JSCpUduqxPVXx2ihPCrVZiUI6PXLbp6ls5PnVdK5xpQHICiPElHuH8NnqE5IWqJ6M","refresh_token":"1/p0pc-6xyyT-3B5X1K_s2OpnH2EkYCRYQnUC9uFJtdbA","scope":"https://www.googleapis.com/auth/spreadsheets","token_type":"Bearer","expiry_date":1541581733346};
  MysheetId = '1xRQcUdGFhQCqDHuR4BQbXNl9pF1s26krIEmiG9SQqRM';
  var request = {
    'spreadsheetId': MysheetId,
    'ranges': [
        "sheet1",
        "sheet2"
      ],
    'auth': oAuth2Client
  };
  sheets.spreadsheets.values.batchGet(request, function(err, response) {
    sheetvalue = response.data.valueRanges[0].values;
    sheet2value = response.data.valueRanges[1].values;
  });
   
}


function getRandom(x){
    return Math.floor(Math.random()*x);
}

//將試算表內容導出
bot.on('message', function (event) {
	if(event.message.text.indexOf('如果我說') != -1 && event.message.text.indexOf('你要回答') != -1){
		var keyword_in = event.message.text.substring(event.message.text.indexOf('如果我說') + 4,event.message.text.indexOf('你要回答')).trim();
		var ans_in = event.message.text.substring(event.message.text.indexOf('你要回答') + 4).trim();
		var done = false;
		var add_verify = false;
		for(all in sheet2value){
			var keyword = sheet2value[all][0].toString().split('#');
			var answer = sheet2value[all][1].toString().split('#');
			for(kw in keyword){
				if(keyword[kw] === keyword_in){
					for(ans in answer){
						if(answer[ans] === ans_in){
							add_verify = true;
							event.reply('這個我學過了喔');
						}
					}
					if(add_verify != true){
						
						sheet2value[all][1] = answer+'#'+ans_in;
						answer.push(ans_in);
						//這裡寫入
						var request2 = {
							'spreadsheetId':MysheetId,
							'range':'sheet2!B'+(Number(all)+1),
							'valueInputOption':'RAW',
							auth:oAuth2Client,
							'resource':{
								"values":[
								[sheet2value[all][1]]
								]
							},
						};
						sheets.spreadsheets.values.update(request2);
						add_verify = false;
						event.reply('好的');
					}
					done = true;
					break;
				}
			}
		} 
		if(done === false){
			sheet2value.push([keyword_in,ans_in]);
			//這裡寫入
			var request3 = {
				'spreadsheetId':MysheetId,
				'range':'sheet2!A' + (Number(sheet2value.length)),
				'valueInputOption':'RAW',
				auth:oAuth2Client,
				'resource':{
					"values":[
					[keyword_in,ans_in]
					]
				},
			}; 
			sheets.spreadsheets.values.update(request3);
			done = true;
			event.reply('好的');
		}
	}
	else {
		// for(i in sheetvalue){
		// 	if(event.message.text === sheetvalue[i][3].toString()){
		// 		event.reply(sheetvalue[i][0].toString()+'\n'+sheetvalue[i][1].toString());     		
		// 		break;
		// 	}
		// }
		for(j in sheet2value){
			var keyword = sheet2value[j][0].toString().split('#');
			var answer = sheet2value[j][1].toString().split('#');
			for(kw in keyword){
				if(keyword[kw] === event.message.text){							
						event.reply(answer[getRandom(answer.length)]);
						break;
				}
			}	
		}
	}
});


//導入Beacon
// var Beaconname=[];
// bot.on('beacon',function(event){
		// var a = 'false';
		// event.source.profile().then(function(profile){
			// for(b in Beaconname){
					// if (Beaconname[b]===profile.displayName) {
						// a = 'true';
					// }
			// }
			// if (a==='false'&&event.beacon.hwid==='011ea826b4'&& event.beacon.type==='enter') {
				// Beaconname.push(profile.displayName);
				// event.reply(profile.displayName+'你好呀>w<歡迎使用食破天機');
			// }
		// });
// });


app.listen(process.env.PORT || 80, function () {
	console.log('LineBot is running.');
});
