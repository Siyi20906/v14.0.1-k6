import { group, check, sleep } from 'k6';
import http from 'k6/http';
import {login} from './login.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import {Trend} from 'k6/metrics'
let orderlist_time= new Trend('order-list-time');

export let options = {
    // vus:5
    stages: [
      { duration: '500s', target: 100}, //ramp up 2 user 10s  
      { duration: '100s', target: 100 }, //duration of run

    ],
};


const csvData = papaparse.parse(open('./data.csv'), { header: true }).data;





export default function () {
  // get data from csv file
  let index = __VU % csvData.length - 1;
  const record = csvData[index];

  let username =record.username;
  let password = record.password;

  let host = record.host;
  let domain = record.domain;

  
  let res, cookie;
  
  cookie = login(username, password, host, domain); ;
  console.log(username, "cookie" , cookie);
  
  //sleep(3);
  //orderlist
  var url = 'http://'+host+'/ApemMobile/servlet/mobileOrderListServlet?tz=America%2FLos_Angeles&states=0%7C6%7C3%7C2%7C1%7C4%7C7%7C8%7C9%7C10';
  let data = {};
  let start = Date.now();
  res = http.post(url, JSON.stringify(data),
  { 
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
    if (res.json().result == 1){
      //request success add time to the trend
      let end = Date.now();
      orderlist_time.add(end-start); 
    }
   	 
  console.log("Orderlist ",username,password,"Status",res.status_text,"Error",res.error,"error_code",res.error_code);  
  check(res, {"status is 200": (r) => r.status === 200 }); 
    

}



