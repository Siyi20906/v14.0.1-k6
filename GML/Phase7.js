import { group, check, sleep } from 'k6';
import http from 'k6/http';
import encoding from 'k6/encoding';
import {printerror} from './printerror.js';
// Version: 1.2
// Creator: WebInspector


const Phase7 = function(host1, ID_ORDER1, ID_OPER1, domain1 , username1, password1, cookie1) {
	
	let res, redirectUrl, json;
	let host = host1;	
	let ID_ORDER = ID_ORDER1;
	let ID_OPER = ID_OPER1;
	let domain = domain1;
	let username = username1;
	let password = password1;
	let cookie = cookie1;

	var obj;
	let bpasswordcorrect = false;
	
	let action_delay = 4;
	let basic_delay = 3;
	let timeout = 120000;


	 //click start , start execute
	 var url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%2FLos_Angeles&ws_id=0&order_id=' + ID_ORDER + '&oper_id=' + ID_OPER + '&oper_name=MIXING_MEASUREMENT&action=1';
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
		console.log('++++++++++phase7 : response is empty++++++++++++++++++++++++');
		return 0;
	}
	check(res, {"Result is 1": (r) => r.json().result === 1 });  

	var test 
	try{
		test = res.json()
	}
	catch(err){
		console.log("##########Phase7", cookie)

		console.log("@@@@@@@@@@@@@@Phase7", JSON.stringify(res))
	}
	if(res.json().result !=null){
		if(res.json().result == 1){
			//request success continue
			console.log(" Phase7 Ready!");
		}
		else{
			//request fail, return
			obj =  res.json();
			printerror("Phase7-1", url, ID_ORDER, ID_OPER, obj);
			return 0;
			
		}
	}
	else{
		obj =  res.json();
		printerror("Phase7-2", url, ID_ORDER, ID_OPER, obj);
		return 0;
	}

	sleep(action_delay);
	var vmname = res.json().mobileScreen.vmName;
	//console.log("phase7 URL",res.request.url,"ERROR",res.error_code,"STATUS",res.status_text,"BODY",res.body)

	//Input1
	url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=4&targetComp=MEASUREMENT_ENTRY.Component1.F_Actual&targetCompValue=&sourceComp=MEASUREMENT_ENTRY.Component1.F_Actual&sourceCompValue=';
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
		console.log('++++++++++phase7 : response is empty++++++++++++++++++++++++');
		return 0;
	}
	check(res, {"Result is 1": (r) => r.json().result === 1 });  

	if(res.json().result != 1){
		obj =  res.json();
		printerror("Phase7", url, ID_ORDER, ID_OPER, obj);
	}
	sleep(action_delay);
	//console.log("phase7 URL",res.request.url,"ERROR",res.error_code,"STATUS",res.status_text,"BODY",res.body)

	//Inout2
	url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=4&targetComp=MEASUREMENT_ENTRY.Component2.F_Actual&targetCompValue=&sourceComp=MEASUREMENT_ENTRY.Component1.F_Actual&sourceCompValue=8.3';
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
		console.log('++++++++++phase7 : response is empty++++++++++++++++++++++++');
		return 0;
	}
	check(res, {"Result is 1": (r) => r.json().result === 1 });  
	if(res.json().result != 1){
		obj =  res.json();
		printerror("Phase7", url, ID_ORDER, ID_OPER, obj);
	}
	sleep(action_delay);
	//console.log("phase7 URL",res.request.url,"ERROR",res.error_code,"STATUS",res.status_text,"BODY",res.body)

	//We need to do sign till user/password is correct.
	while( !bpasswordcorrect )
	{
		//Click OK
		url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=4&targetComp=MEASUREMENT_ENTRY.CmpFooter.txtUserId&targetCompValue=&sourceComp=MEASUREMENT_ENTRY.Component2.F_Actual&sourceCompValue=64.00';
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
			console.log('++++++++++phase7 : response is empty++++++++++++++++++++++++');
			return 0;
		}
		check(res, {"Result is 1": (r) => r.json().result === 1 });  
		if(res.json().result != 1){
			obj =  res.json();
			printerror("Phase7", url, ID_ORDER, ID_OPER, obj);
		}
		sleep(action_delay);
		//console.log("phase7 URL",res.request.url,"ERROR",res.error_code,"STATUS",res.status_text,"BODY",res.body)

		//enter comment
		url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=MEASUREMENT_ENTRY.CmpFooter.btnEnterComment&targetCompValue=yes&sourceComp=MEASUREMENT_ENTRY.CmpFooter.txtUserId&sourceCompValue=';
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
			console.log('++++++++++phase7 : response is empty++++++++++++++++++++++++');
			return 0;
		}
		check(res, {"Result is 1": (r) => r.json().result === 1 });  
		
		if(res.json().result != 1){
			obj =  res.json();
			printerror("Phase7", url, ID_ORDER, ID_OPER, obj);
		}
		sleep(action_delay);
		//console.log("phase7 URL",res.request.url,"ERROR",res.error_code,"STATUS",res.status_text,"BODY",res.body)
		
		
		//submit comment
		url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=mobileMessageInputDialog&targetCompValue=16&targetCompExtraValue=test7';
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
			console.log('++++++++++phase7 : response is empty++++++++++++++++++++++++');
			return 0;
		}
		check(res, {"Result is 1": (r) => r.json().result === 1 });  

		if(res.json().result != 1){
			obj =  res.json();
			printerror("Phase7", url, ID_ORDER, ID_OPER, obj);
		}
		sleep(action_delay);
		//console.log("phase7 URL",res.request.url,"ERROR",res.error_code,"STATUS",res.status_text,"BODY",res.body)

		//enter username
		url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=4&targetComp=MEASUREMENT_ENTRY.CmpFooter.txtUserId&targetCompValue=&sourceComp=MEASUREMENT_ENTRY.CmpFooter.btnEnterComment&sourceCompValue=';
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
			console.log('++++++++++phase7 : response is empty++++++++++++++++++++++++');
			return 0;
		}
		check(res, {"Result is 1": (r) => r.json().result === 1 });  

		if(res.json().result != 1){
			obj =  res.json();
			printerror("Phase7", url, ID_ORDER, ID_OPER, obj);
		}
		sleep(action_delay);
		//console.log("phase7 URL",res.request.url,"ERROR",res.error_code,"STATUS",res.status_text,"BODY",res.body)
		

		url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=4&targetComp=MEASUREMENT_ENTRY.CmpFooter.pwdSignature&targetCompValue=undefined&sourceComp=MEASUREMENT_ENTRY.CmpFooter.txtUserId&sourceCompValue=' + domain + '%5C' + username;
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
			console.log('++++++++++phase7 : response is empty++++++++++++++++++++++++');
			return 0;
		}
		check(res, {"Result is 1": (r) => r.json().result === 1 });  
		if(res.json().result != 1){
			obj =  res.json();
			printerror("Phase7", url, ID_ORDER, ID_OPER, obj);
		}
		sleep(action_delay);
		//console.log("phase7 URL",res.request.url,"ERROR",res.error_code,"STATUS",res.status_text,"BODY",res.body)

		//submit password
		let encodepassword = encoding.b64encode(password);
		url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=6&sourceComp=MEASUREMENT_ENTRY.CmpFooter.pwdSignature&sourceCompValue=' + encodepassword + '&sourceCompExtraValue=null';
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
			console.log('++++++++++phase7 : response is empty++++++++++++++++++++++++');
			return 0;
		}
		check(res, {"Result is 1": (r) => r.json().result === 1 });  
	
		if(res.json().result != 1){
			obj =  res.json();
			printerror("Phase7", url, ID_ORDER, ID_OPER, obj);
		}
		
		//check password issue
		if( res.json().mobileScreen != null && res.json().mobileScreen != undefined )
		{
		   if( res.json().mobileScreen.message == null || res.json().mobileScreen.message == undefined || res.json().mobileScreen.message == '' )
		   {
			   bpasswordcorrect = true;
		   }
		   else if( JSON.stringify(res.json().mobileScreen.message).search("password") == -1 )
		   {
			   //print error, get out;
			   printerror("Phase7 General error: ", url, ID_ORDER, ID_OPER, res.json().mobileScreen.message);
			   //return 0;
		   }else
		   {
			   //password error
			   printerror("Phase7 password error:", url, ID_ORDER, ID_OPER, res.json().mobileScreen.message);
		   }
		}
		else
		{
		   //no error
		   bpasswordcorrect = true;
		}
		//console.log("phase7 URL",res.request.url,"ERROR",res.error_code,"STATUS",res.status_text,"BODY",res.body)
		sleep(basic_delay);
	}

};
export {Phase7}


