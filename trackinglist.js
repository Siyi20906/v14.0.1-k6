import { group, check, sleep } from 'k6';
import http from 'k6/http';
import {Trend} from 'k6/metrics'
// Version: 1.2
// Creator: WebInspector


const trackinglist = function( host1, ID_ORDER1, oper_name1, cookie1) {
	
	let res, redirectUrl, json;
	let host = host1;

	let ID_ORDER = ID_ORDER1;
	let oper_name = oper_name1;
	let cookie = cookie1;

	let timeout = 500000;


	
	var url = 'http://'+host+'/ApemMobile/servlet/mobileOrderTrackingListServlet?tz=America%2FLos_Angeles&orderID='+ID_ORDER;
                   
	
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
	check(res, {"Result is 1": (r) => r.json().result === 1 }); 


	
	var obj =  res.json().dataRows;	

	//console.log(obj)


	let len = obj.length;
	//console.log(len)
	let i = 0;
	while(i<len){
		
		if(obj[i].TAG == oper_name&&obj[i].STATUS=='Ready'){
			//Check if the operation is ready for execution	
				return obj[i].ID_OPER;	
		}
		else{
			i++;		
		}
	}
	return null;

};
export {trackinglist}


