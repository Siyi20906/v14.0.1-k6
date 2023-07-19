import { group, check, sleep } from 'k6';
import http from 'k6/http';
import encoding from 'k6/encoding';


// Version: 1.2
// Creator: WebInspector



const login = function(username1, password1, host1, domain1) {
	console.log("Logging in-----------------------------------");
	let res, redirectUrl, json;	
	let username = username1;
	let password = password1;
	let host = host1;
	let domain =  domain1;
	let username2 = domain + '\\' +  username;
	let authString = username2 + '@' + 'WORKSTATION' +':' +password;
	//console.log("authString" + authString)

	let timeout = 120000;

	//sleep(1)
	var url = 'http://qaone1:Aspen111@'+host+'/ApemMobile/servlet/mobileAuthenticationServlet?tz=America%2FLos_Angeles';
	let data = {};
	res = http.post(url, JSON.stringify(data),
    { 
		timeout: `${timeout}`,
					
		headers: { 
		'Content-Type': 'application/json' , 
		"WEBLogin" : 'Basic:'+ encoding.b64encode(authString) ,
		"Host": `${host}`,
		"Connection": "keep-alive",
		"Accept": "application/json, text/plain, */*",						  
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36",
		"Origin": `http://${host}`,
		"Referer": `http://${host}/ApemMobile/`,
		"Accept-Encoding": "gzip, deflate",
		"Accept-Language": "en-US,en;q=0.9",
		} 
	});	
	check(res, {"status is 200": (r) => r.status === 200 }); 
	//check(res, {"Result is 1": (r) => r.json().result === 1 }); 
	//console.log(res.body)

	console.log("Logged in as ",username,password,res.status_text,"Error",res.error,"error_code",res.error_code,"request.body",res.request.body,"Header",res.request.headers);
	let jar = http.cookieJar();
	let cookies = jar.cookiesForURL(url);
	//console.log (cookies["JSESSIONID"]);
	return cookies["JSESSIONID"];
		
	
};
export {login}


