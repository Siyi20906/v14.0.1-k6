import { group, check, sleep } from 'k6';
import http from 'k6/http';
import {Trend} from 'k6/metrics'
import { printerror } from './printerror.js';
// Version: 1.2
// Creator: WebInspector
let commentWindow = new Trend('comment_window');

const CreateComment_Production = function(host1, ID_ORDER1, ID_OPER1,  cookie1) {

	let res, redirectUrl, json;
		
	let host = host1;
	let ID_ORDER = ID_ORDER1;
	let ID_OPER =ID_OPER1;
	let  cookie =  cookie1;

	var obj;

	let action_delay = 2;
	let basic_delay = 5;
	let timeout = 120000;



	// Request #0	start execute
	var url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%2FLos_Angeles&ws_id=0&order_id=' + ID_ORDER + '&oper_id=' + ID_OPER + '&oper_name=CREATE_COMMENT&action=1';
	
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
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.864.59",
			"Origin": `http://${host}`,
			"Referer": `http://${host}/ApemMobile/`,
			"Accept-Encoding": "gzip, deflate",
			"Accept-Language": "en-US,en;q=0.9"
		}
	});	
	check(res, {"status is 200": (r) => r.status === 200 });
	check(res, {"Result is 1": (r) => r.json().result === 1 }); 
	
	if(res.json().result !=null){
		if(res.json().result == 1){
			//request success continue
			console.log(" Ready!");
		}
		else{
			//request fail, return
			console.log("Create Not Ready!");
			obj =  res.json();
			printerror("Create_Pro-1", url, ID_ORDER, ID_OPER, obj)
			
			return 0;
			
		}
	}
	else{
		obj =  res.json();
		printerror("Create_Pro-2", url, ID_ORDER, ID_OPER, obj)
		return 0;
	}
	
	var vmname = res.json().mobileScreen.vmName;
	
	sleep(action_delay);
	let start = Date.now();	
	// Request #1	select type of the comment Production
	url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=mobileMessageInputDialog&targetCompValue=16&targetCompExtraValue=4',
	data = {};	
	res = http.post(url, JSON.stringify(data),{ 
		timeout: `${timeout}`,
		"cookies": {
			"JSESSIONID": `${cookie}`
		  },
		"headers": {
			"Host": `${host}`,
			"Connection": "keep-alive",
			"Accept": "application/json, text/plain, */*",
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.864.59",
			"Origin": `http://${host}`,
			"Referer": `http://${host}/ApemMobile/`,
			"Accept-Encoding": "gzip, deflate",
			"Accept-Language": "en-US,en;q=0.9"
		}
	});	
	let end = Date.now();
	if(res.json().result == 1){
		//request success addtime to trend
		commentWindow.add(end-start);
	}
	
		
	check(res, {"status is 200": (r) => r.status === 200 });
	check(res, {"Result is 1": (r) => r.json().result === 1 }); 
	if(res.json().result != 1){
		obj =  res.json();
		printerror("Create_Pro", url, ID_ORDER, ID_OPER, obj)
	}
	sleep(action_delay);

	// Request #2 submit comments
	url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=mobileMessageInputDialog&targetCompValue=16&targetCompExtraValue=P1';
	data = {};	
	res = http.post(url, JSON.stringify(data),{ 
		timeout: `${timeout}`,
		"cookies": {
			"JSESSIONID": `${cookie}`
		  },
		"headers": {
			"Host": `${host}`,
			"Connection": "keep-alive",
			"Accept": "application/json, text/plain, */*",
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.864.59",
			"Origin": `http://${host}`,
			"Referer": `http://${host}/ApemMobile/`,
			"Accept-Encoding": "gzip, deflate",
			"Accept-Language": "en-US,en;q=0.9"
		}
	});		
	check(res, {"status is 200": (r) => r.status === 200 });
	check(res, {"Result is 1": (r) => r.json().result === 1 }); 
	if(res.json().result != 1){
		obj =  res.json();
		printerror("Create_Pro", url, ID_ORDER, ID_OPER, obj)
	}

	console.log("Production create comment.","Status",res.status_text);
	sleep(action_delay);
		
		
		
	

}
export {CreateComment_Production}