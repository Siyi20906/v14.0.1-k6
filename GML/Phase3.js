	import { group, check, sleep } from 'k6';
import http from 'k6/http';
import encoding from 'k6/encoding';
import {printerror} from './printerror.js';
// Version: 1.2
// Creator: WebInspector


const Phase3 = function(host1, ID_ORDER1, ID_OPER1,domain1 , username1, password1, cookie1) {
	
	let res, redirectUrl, json;
	let host = host1;	
	let ID_ORDER = ID_ORDER1;
	let ID_OPER = ID_OPER1;
	let domain = domain1;
	let username = username1;
	let password = password1;
	let cookie = cookie1;

	let bpasswordcorrect = false;

	var obj;
	
	let action_delay = 3;
	let basic_delay = 3;
	let end_waite_time = 5;
	let timeout = 120000;

	 //click start , start execute
	var url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%2FLos_Angeles&ws_id=8&order_id=' + ID_ORDER + '&oper_id=' + ID_OPER + '&oper_name=STARTUP_CHECKLIST&action=1';
	 //console.log(url)
	let data = {};
	res = http.post(url, JSON.stringify(data),
   {
	timeout: `${timeout}`,
	   "cookies": {
		   "JSESSIONID": `${cookie}`
		},	
		"headers": {
			"Host": `${host}`,
			"Connection": "keep-alive",
			"Accept": "application/json, text/plain, */*",
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64",
			"Origin": `http://${host}`,
			"Referer": `http://${host}/ApemMobile/`,
			"Accept-Encoding": "gzip, deflate",
			"Accept-Language": "en-US,en;q=0.9"
		}
	});	

	check(res, {"status is 200": (r) => r.status === 200 });
	try
	{
		var obj1 =  res.json();	
	}
	catch(err)
	{
		console.log('++++++++++phase3 : response is empty++++++++++++++++++++++++');
		return 0;
	}
	check(res, {"Result is 1": (r) => r.json().result === 1 });  

	var test 
	try{
		test = res.json()
	}
	catch(err){
		console.log("##########Phase3", cookie)

		console.log("@@@@@@@@@@@@@@Phase3", JSON.stringify(res))
	}
	if(res.json().result !=null){
		if(res.json().result == 1){
			//request success continue
			console.log(" Phase3-1 Ready!");
		}
		else{
			//request fail, return
			console.log("Phase3 Not Ready!");
			obj =  res.json();
			printerror("Phase3-2", url, ID_ORDER, ID_OPER, obj);
			return 0;
			
		}
	}
	else{
		obj =  res.json();
		printerror("Phase3-3", url, ID_ORDER, ID_OPER, obj);
		return 0;
	}
		 
	 sleep(action_delay);
	 var vmname = res.json().mobileScreen.vmName;
	 //console.log("Phase3 URL",res.request.url,"ERROR",res.error_code,"STATUS",res.status_text,"BODY",res.body)


	 //click checkbox1
	 url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=CHECK_LIST.tblCheckList&targetCompValue=true%7C0_0&sourceComp=CHECK_LIST.cmpFooter.btnViewSop&sourceCompValue=';
	 //console.log(url)
	 data = {};
	 res = http.post(url, JSON.stringify(data),
   {
	timeout: `${timeout}`,
	"cookies": {
		"JSESSIONID": `${cookie}`
	},	
	 "headers": {
	   "Host": `${host}`,
	   "Connection": "keep-alive",
	   "Accept": "application/json, text/plain, */*",
	   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64",
	   "Origin": `http://${host}`,
		"Referer": `http://${host}/ApemMobile/`,
	   "Accept-Encoding": "gzip, deflate",
	   "Accept-Language": "en-US,en;q=0.9"
	   }
		 });	
	 check(res, {"status is 200": (r) => r.status === 200 }); 
	 try
	{
		var obj1 =  res.json();	
	}
	catch(err)
	{
		console.log('++++++++++phase3 2: response is empty++++++++++++++++++++++++');
		return 0;
	}
	check(res, {"Result is 1": (r) => r.json().result === 1 });  
	 if(res.json().result != 1){
		obj =  res.json();
		printerror("Phase3", url, ID_ORDER, ID_OPER, obj);
	}
	 sleep(basic_delay);
	 //console.log("Phase3 URL",res.request.url,"ERROR",res.error_code,"STATUS",res.status_text,"BODY",res.body)

	 //click checkbox12

	 url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=CHECK_LIST.tblCheckList&targetCompValue=true%7C1_0&sourceComp=CHECK_LIST.tblCheckList&sourceCompValue=true%7C0_0';
	 //console.log(url)
	 data = {};
	 res = http.post(url, JSON.stringify(data),
   {
	timeout: `${timeout}`,
	"cookies": {
		"JSESSIONID": `${cookie}`
	},	
	 "headers": {
	   "Host": `${host}`,
	   "Connection": "keep-alive",
	   "Accept": "application/json, text/plain, */*",
	   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64",
	   "Origin": `http://${host}`,
		"Referer": `http://${host}/ApemMobile/`,
	   "Accept-Encoding": "gzip, deflate",
	   "Accept-Language": "en-US,en;q=0.9"
	   }
		 });	
	
	check(res, {"status is 200": (r) => r.status === 200 });
	try
	{
		var obj1 =  res.json();	
	}
	catch(err)
	{
		console.log('++++++++++phase3 3: response is empty++++++++++++++++++++++++');
		return 0;
	}
	check(res, {"Result is 1": (r) => r.json().result === 1 });  
	
	 if(res.json().result != 1){
		obj =  res.json();
		printerror("Phase3", url, ID_ORDER, ID_OPER, obj);
	}
	 sleep(basic_delay);

	 //click checkbox3

	 url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=CHECK_LIST.tblCheckList&targetCompValue=true%7C2_0&sourceComp=CHECK_LIST.tblCheckList&sourceCompValue=true%7C1_0';
	 //console.log(url)
	 data = {};
	 res = http.post(url, JSON.stringify(data),
   {
	timeout: `${timeout}`,
	"cookies": {
		"JSESSIONID": `${cookie}`
	},	
	 "headers": {
	   "Host": `${host}`,
	   "Connection": "keep-alive",
	   "Accept": "application/json, text/plain, */*",
	   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64",
	   "Origin": `http://${host}`,
		"Referer": `http://${host}/ApemMobile/`,
	   "Accept-Encoding": "gzip, deflate",
	   "Accept-Language": "en-US,en;q=0.9"
	   }
	});	
	 
	 check(res, {"status is 200": (r) => r.status === 200 });
	try
	{
		var obj1 =  res.json();	
	}
	catch(err)
	{
		console.log('++++++++++phase3 4: response is empty++++++++++++++++++++++++');
		return 0;
	}
	check(res, {"Result is 1": (r) => r.json().result === 1 });  
	
	 if(res.json().result != 1){
		obj =  res.json();
		printerror("Phase3", url, ID_ORDER, ID_OPER, obj);
	}
	 sleep(basic_delay);

	 //We need to do sign till user/password is correct.
	 while( !bpasswordcorrect )
	 {
		 //click OK
		 url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=4&targetComp=CHECK_LIST.cmpFooter.txtUserId&targetCompValue=&sourceComp=CHECK_LIST.tblCheckList&sourceCompValue=true%7C2_0';
		 //console.log(url)
		 data = {};
		 res = http.post(url, JSON.stringify(data),
			 {
				 timeout: `${timeout}`,
				 "cookies": {
					 "JSESSIONID": `${cookie}`
				 },
				 "headers": {
					 "Host": `${host}`,
					 "Connection": "keep-alive",
					 "Accept": "application/json, text/plain, */*",
					 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64",
					 "Origin": `http://${host}`,
					 "Referer": `http://${host}/ApemMobile/`,
					 "Accept-Encoding": "gzip, deflate",
					 "Accept-Language": "en-US,en;q=0.9"
				 }
			 });
		 check(res, { "status is 200": (r) => r.status === 200 });
		 try {
			 var obj1 = res.json();
		 }
		 catch (err) {
			 console.log('++++++++++phase3 5: response is empty++++++++++++++++++++++++');
			 return 0;
		 }
		 check(res, { "Result is 1": (r) => r.json().result === 1 });

		 if (res.json().result != 1) {
			 obj = res.json();
			 printerror("Phase3", url, ID_ORDER, ID_OPER, obj);
		 }
		 sleep(basic_delay);

		 //click enter comment
		 url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=CHECK_LIST.cmpFooter.btnEnterComment&targetCompValue=yes&sourceComp=CHECK_LIST.cmpFooter.txtUserId&sourceCompValue=';
		 //console.log(url)
		 data = {};
		 res = http.post(url, JSON.stringify(data),
			 {
				 timeout: `${timeout}`,
				 "cookies": {
					 "JSESSIONID": `${cookie}`
				 },
				 "headers": {
					 "Host": `${host}`,
					 "Connection": "keep-alive",
					 "Accept": "application/json, text/plain, */*",
					 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64",
					 "Origin": `http://${host}`,
					 "Referer": `http://${host}/ApemMobile/`,
					 "Accept-Encoding": "gzip, deflate",
					 "Accept-Language": "en-US,en;q=0.9"
				 }
			 });

		 check(res, { "status is 200": (r) => r.status === 200 });
		 try {
			 var obj1 = res.json();
		 }
		 catch (err) {
			 console.log('++++++++++phase3 6: response is empty++++++++++++++++++++++++');
			 return 0;
		 }
		 check(res, { "Result is 1": (r) => r.json().result === 1 });

		 if (res.json().result != 1) {
			 obj = res.json();
			 printerror("Phase3", url, ID_ORDER, ID_OPER, obj);
		 }
		 sleep(basic_delay);


		 //submit comment
		 url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=mobileMessageInputDialog&targetCompValue=16&targetCompExtraValue=test';
		 //console.log(url)
		 data = {};
		 res = http.post(url, JSON.stringify(data),
			 {
				 timeout: `${timeout}`,
				 "cookies": {
					 "JSESSIONID": `${cookie}`
				 },
				 "headers": {
					 "Host": `${host}`,
					 "Connection": "keep-alive",
					 "Accept": "application/json, text/plain, */*",
					 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64",
					 "Origin": `http://${host}`,
					 "Referer": `http://${host}/ApemMobile/`,
					 "Accept-Encoding": "gzip, deflate",
					 "Accept-Language": "en-US,en;q=0.9"
				 }
			 });
		 check(res, { "status is 200": (r) => r.status === 200 });
		 try {
			 var obj1 = res.json();
		 }
		 catch (err) {
			 console.log('++++++++++phase3 7: response is empty++++++++++++++++++++++++');
			 return 0;
		 }
		 check(res, { "Result is 1": (r) => r.json().result === 1 });
		 if (res.json().result != 1) {
			 obj = res.json();
			 printerror("Phase3", url, ID_ORDER, ID_OPER, obj);
		 }
		 sleep(basic_delay);



		 //enter username 
		 url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=4&targetComp=CHECK_LIST.cmpFooter.txtUserId&targetCompValue=&sourceComp=CHECK_LIST.cmpFooter.btnEnterComment&sourceCompValue=';
		 //console.log(url)
		 data = {};
		 res = http.post(url, JSON.stringify(data),
			 {
				 timeout: `${timeout}`,
				 "cookies": {
					 "JSESSIONID": `${cookie}`
				 },
				 "headers": {
					 "Host": `${host}`,
					 "Connection": "keep-alive",
					 "Accept": "application/json, text/plain, */*",
					 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64",
					 "Origin": `http://${host}`,
					 "Referer": `http://${host}/ApemMobile/`,
					 "Accept-Encoding": "gzip, deflate",
					 "Accept-Language": "en-US,en;q=0.9"
				 }
			 });
		 check(res, { "status is 200": (r) => r.status === 200 });
		 try {
			 var obj1 = res.json();
		 }
		 catch (err) {
			 console.log('++++++++++phase3 8: response is empty++++++++++++++++++++++++');
			 return 0;
		 }
		 check(res, { "Result is 1": (r) => r.json().result === 1 });
		 if (res.json().result != 1) {
			 obj = res.json();
			 printerror("Phase3", url, ID_ORDER, ID_OPER, obj);
		 }
		 sleep(basic_delay);


		 //submit username 
		 url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=4&targetComp=CHECK_LIST.cmpFooter.pwdSignature&targetCompValue=undefined&sourceComp=CHECK_LIST.cmpFooter.txtUserId&sourceCompValue=' + domain + '%5C' + username;
		 //console.log(url)
		 data = {};
		 res = http.post(url, JSON.stringify(data),
			 {
				 timeout: `${timeout}`,
				 "cookies": {
					 "JSESSIONID": `${cookie}`
				 },
				 "headers": {
					 "Host": `${host}`,
					 "Connection": "keep-alive",
					 "Accept": "application/json, text/plain, */*",
					 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64",
					 "Origin": `http://${host}`,
					 "Referer": `http://${host}/ApemMobile/`,
					 "Accept-Encoding": "gzip, deflate",
					 "Accept-Language": "en-US,en;q=0.9"
				 }
			 });
		 check(res, { "status is 200": (r) => r.status === 200 });
		 try {
			 var obj1 = res.json();
		 }
		 catch (err) {
			 console.log('++++++++++phase3 9: response is empty++++++++++++++++++++++++');
			 return 0;
		 }
		 check(res, { "Result is 1": (r) => r.json().result === 1 });
		 if (res.json().result != 1) {
			 obj = res.json();
			 printerror("Phase3", url, ID_ORDER, ID_OPER, obj);
		 }
		 sleep(basic_delay);

		 //submit password
		 let encodepassword = encoding.b64encode(password);
		 //console.log(encodepassword)
		 url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=6&sourceComp=CHECK_LIST.cmpFooter.pwdSignature&sourceCompValue=' + encodepassword + '&sourceCompExtraValue=null';
		 //console.log(url)
		 data = {};
		 res = http.post(url, JSON.stringify(data),
			 {
				 timeout: `${timeout}`,
				 "cookies": {
					 "JSESSIONID": `${cookie}`
				 },
				 "headers": {
					 "Host": `${host}`,
					 "Connection": "keep-alive",
					 "Accept": "application/json, text/plain, */*",
					 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64",
					 "Origin": `http://${host}`,
					 "Referer": `http://${host}/ApemMobile/`,
					 "Accept-Encoding": "gzip, deflate",
					 "Accept-Language": "en-US,en;q=0.9"
				 }
			 });
		 check(res, { "status is 200": (r) => r.status === 200 });
		 try {
			 var obj1 = res.json();
		 }
		 catch (err) {
			 console.log('++++++++++phase3 10: response is empty++++++++++++++++++++++++');
			 return 0;
		 }
		 check(res, { "Result is 1": (r) => r.json().result === 1 });
		 if (res.json().result != 1) {
			 obj = res.json();
			 printerror("Phase3", url, ID_ORDER, ID_OPER, obj);
			 return 0;
		 }

		 //check password issue
		 if( res.json().mobileScreen != null && res.json().mobileScreen != undefined )
		 {
			//printerror("Phase3_wrong", url, ID_ORDER, ID_OPER, obj);
			if( res.json().mobileScreen.message == null || res.json().mobileScreen.message == undefined || res.json().mobileScreen.message == '' )
			{
				bpasswordcorrect = true;
			}
			else if (JSON.stringify(res.json().mobileScreen.message).search("password") == -1) {
				//print error, get out;
				printerror("Phase3 general error: ", url, ID_ORDER, ID_OPER, res.json().mobileScreen.message);
				//retry it rather than abort the whole process.
				//return 0;
			} else {
				//password error
				printerror("Phase3 password error :", url, ID_ORDER, ID_OPER, res.json().mobileScreen.message);
			}
		 }
		 else
		 {
			//no error
			bpasswordcorrect = true;
		 }
		 //console.log("Phase3 URL",res.request.url,"ERROR",res.error_code,"STATUS",res.status_text,"BODY",res.body)	
		 sleep(basic_delay);
	 }

};
export {Phase3}