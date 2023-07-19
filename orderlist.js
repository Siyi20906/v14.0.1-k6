import { group, check, sleep } from 'k6';
import http from 'k6/http';

// Version: 1.2
// Creator: WebInspector

const orderlist = function( host1, order_cod1, cookie1) {
	
	let res;
	let host = host1;
	let order_cod = order_cod1;

	let cookie = cookie1;
	let timeout = 120000;

	var url = 'http://'+host+'/ApemMobile/servlet/mobileOrderListServlet?tz=America%2FLos_Angeles&states=0%7C6%7C3%7C2%7C1%7C4%7C7%7C8%7C9%7C10&init=0&num=200';
                   
	
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
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.864.59",
			"Origin": `http://${host}`,
			"Referer": `http://${host}/ApemMobile/`,
			"Accept-Encoding": "gzip, deflate",
			"Accept-Language": "en-US,en;q=0.9"
						  
		} 
	});	
	check(res, {"status is 200": (r) => r.status === 200 }); 
	check(res, {"Result is 1": (r) => r.json().result === 1 }); 
	//console.log(JSON.stringify(res))
	var obj =  res.json().dataRows;
	

	let len = obj.length

	//console.log(len)
	let i = 0;
	while(i<len){
		
		if(obj[i].CODE == order_cod){
			//console.log(obj[i].ID_ORDER);
			return obj[i].ID_ORDER;
			
		}
		else{
			i++;	
		}

	}
	
	
};
export {orderlist}


