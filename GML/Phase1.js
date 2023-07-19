import { group, check, sleep } from 'k6';
import http from 'k6/http';
import {printerror} from './printerror.js';
// Version: 1.2
// Creator: WebInspector



const Phase1 = function(host1, ID_ORDER1, ID_OPER1, cookie1) {
	
	let res, redirectUrl, json;
	let host = host1;
	let ID_ORDER = ID_ORDER1;
	let ID_OPER = ID_OPER1;
	let cookie = cookie1;

	let action_delay = 3;
	let basic_delay = 3;
	let end_waite_time = 5;
	let timeout = 120000;

	var obj;


	
	var url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%2FLos_Angeles&ws_id=6&order_id=' + ID_ORDER + '&oper_id=' + ID_OPER + '&oper_name=INTRODUCTION&action=1';
	
	let data = {};
	res = http.post(url, JSON.stringify(data),
    { 
		timeout: `${timeout}`,
		"cookies": {
			"JSESSIONID": `${cookie}`
		},
		headers: { 
		"Host": `${host}`,
		"Connection": "keep-alive",
		"Accept": "application/json, text/plain, */*",
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.66",
		"Origin": `http://${host}`,
		"Referer": `http://${host}/ApemMobile/`,
		"Accept-Encoding": "gzip, deflate",
		"Accept-Language": "en-US,en;q=0.9",
		} 
	});	
	check(res, {"status is 200": (r) => r.status === 200 });
	try
	{
		var obj1 =  res.json();	
	}
	catch(err)
	{
		console.log('++++++++++phase1 : response is empty++++++++++++++++++++++++');
		return 0;
	}
	check(res, {"Result is 1": (r) => r.json().result === 1 });
	
	sleep(action_delay) 
	

	
	var test 
	try{
		test = res.json()
	}
	catch(err){
		console.log("##########Phase1", cookie)

		console.log("@@@@@@@@@@@@@@Phase1", JSON.stringify(res))
	}
	if(res.json().result !=null){
		if(res.json().result == 1){
			//request success continue
			console.log(" Phase1 Ready!");
		}
		else{
			//request fail, return
			
			obj =  res.json();
			printerror("Phase1-1", url, ID_ORDER, ID_OPER, obj)
			return 0;
			
		}
	}
	else{
		obj =  res.json();
		printerror("Phase1-2", url, ID_ORDER, ID_OPER, obj)
		return 0;
	}
	

	var vmname = res.json().mobileScreen.vmName;
	sleep(basic_delay);


	url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=INSTRUCTION.cmpFooter.btnOk&targetCompValue=yes&sourceComp=INSTRUCTION.cmpFooter.btnViewSop&sourceCompValue=';
	
	data = {};
	res = http.post(url, JSON.stringify(data),
    { 
		timeout: `${timeout}`,
		"cookies": {
			"JSESSIONID": `${cookie}`
		},
		headers: { 
			"Host": `${host}`,
			"Connection": "keep-alive",
			"Accept": "application/json, text/plain, */*",
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.66",
			"Origin": `http://${host}`,
			"Referer": `http://${host}/ApemMobile/`,
			"Accept-Encoding": "gzip, deflate",
			"Accept-Language": "en-US,en;q=0.9",
		} 
	});	
	check(res, {"status is 200": (r) => r.status === 200 });
	try
	{
		var obj1 =  res.json();	
	}
	catch(err)
	{
		console.log('++++++++++phase1 : response is empty++++++++++++++++++++++++');
		return 0;
	}
	check(res, {"Result is 1": (r) => r.json().result === 1 });
	if(res.json().result != 1){
		obj =  res.json();
		printerror("Phase1", url, ID_ORDER, ID_OPER, obj)
	}
	//console.log("Phase1 URL2",res.request.url,"ERROR",res.error_code,"STATUS",res.status_text,"BODY",res.body)
	
};
export {Phase1}


