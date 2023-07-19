import { group, check, sleep } from 'k6';
import http from 'k6/http';
import {login} from './login.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import {Trend} from 'k6/metrics'
let orderlist_time= new Trend('order-list-time');

export let options = {
    // vus:5
    stages: [
      {duration:'100s',target:20},
      {duration:'10m',target:20},
    ],
};


const csvData = papaparse.parse(open('./data.csv'), { header: true }).data;


let map = new Map();



export default function () {
  // get data from csv file
  let index = __VU % csvData.length - 1;
  const record = csvData[index];

  let username =record.username;
  let password = record.password;

  let host = record.host;
  let domain = record.domain;

  
  let res, cookie;
  let start,end, time;

  //save cookie to the map if this user's cookie is NULL
  if(map[username] == null){
  map[username] = login(username, password, host, domain); 
  console.log("Logged in as ", username, map[username]);//console username password
}

cookie = map[username];
console.log(username, "cookie" , cookie);
let timeout = 120000;
  
 
  //orderlist
  var url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&num=200';
  let data = {};
  start = Date.now();
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

    
    if(res.json().result !=null){
      if(res.json().result == 1){
        end = Date.now();
        orderlist_time.add(end-start);
      }
      else{


        console.log("#####################Fail1", JSON.stringify(res))

        
      }
    }
    else{
      obj =  res.json();
      console.log("*********************Fail2", JSON.stringify(res));
      return 0;
    }

    
    
   	 time = end-start;
    //console.log("Orderlist ",username,password,"Status",res.status_text,"Error",res.error,"error_code",res.error_code);  
    console.log("Orderlist ",username,password,"Time: ", time );  
    check(res, {"status is 200": (r) => r.status === 200 }); 
    sleep(5);
    

}



