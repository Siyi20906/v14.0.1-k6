import { group, check, sleep } from 'k6';
import http from 'k6/http';
import {Trend} from 'k6/metrics'


let viewWait = new Trend('view_wait_time');

const viewComment =  function(host1,ID_ORDER1,ID_OPER1, cookie1) {

	let res, redirectUrl, json;
		
	let host = host1;
	let ID_ORDER = ID_ORDER1;
	let ID_OPER =ID_OPER1;

	let cookie = cookie1;

	let action_delay = 2;
	let end_delay = 5;
	let timeout = 500000;



	//action 1 start execute
	var url = 'http://' + host +'/ApemMobile/servlet/mobileExecutionServlet?tz=America%2FLos_Angeles&order_id=' + ID_ORDER +'&oper_id=' + ID_OPER + '&action=1';
	//console.log(url)
	let data = {};
	res = http.post(url, JSON.stringify(data),{ 
		timeout: `${timeout}`,
		"cookies": {
			"JSESSIONID": `${cookie}`
		  },
		"headers": { 
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
	check(res, {"Result is 1": (r) => r.json().result === 1 }); 
	if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}
	
	if(res.json().result == 1){
		console.log("Ready!");
	}
	else{
		console.log("View Not Ready!",res.json().result == 1);
		return 0;
	}
	//console.log("url:",res.request.url,"Res:",res.body);
	//get vmname
	var vmname = res.json().mobileScreen.vmName;
	sleep(action_delay);
	// Click OK to finish
	let start = Date.now();
	
	//url = 'http://' + host + "/ApemMobile/servlet/mobileExecutionServlet?tz=America%2FLos_Angeles&vmName="+ vmname +"&action=3&targetComp=INSTRUCTION.cmpFooter.btnOk&targetCompValue=yes'";
	url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%2FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=INSTRUCTION.cmpFooter.btnOk&&targetCompValue=ok';

	res = http.post(url,JSON.stringify(data),{ 
		timeout: `${timeout}`,
		"cookies": {
			"JSESSIONID": `${cookie}`
		  },
		"headers": { 
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

	let end = Date.now();
	if(res.json().result == 1){
		console.log("view comment success")
		//request success add time to the trend
		viewWait.add(end-start);
	}
	else{
		console.log("view comment fail","Status",res.status_text,"Error",res.error,"error_code",res.error_code)
	}
	
	check(res, {"status is 200": (r) => r.status === 200 }); 
	check(res, {"Result is 1": (r) => r.json().result === 1 }); 
	if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}

	sleep(end_delay);

		
	
}

export {viewComment}