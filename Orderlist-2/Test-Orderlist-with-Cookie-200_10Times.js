import { group, check, sleep } from 'k6';
import http from 'k6/http';
import {login} from './login.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import {Trend} from 'k6/metrics'

let Page1 = new Trend('Page1');
let Page2 = new Trend('Page2');
let Page3 = new Trend('Page3');
let Page4 = new Trend('Page4');
let Page5 = new Trend('Page5');
let Page6 = new Trend('Page6');
let Page7 = new Trend('Page7');
let Page8 = new Trend('Page8');
let Page9 = new Trend('Page9');
let Page10 = new Trend('Page10');

export let options = {
    // vus:5
    stages: [
      {duration:'500s',target:100},
      {duration:'100s',target:100},
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
  //Order 1 - 200
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
    end = Date.now();
    Page1.add(end-start);

    /*
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
*/
    
    
  //time = end-start;
  //console.log("Orderlist ",username,password,"Status",res.status_text,"Error",res.error,"error_code",res.error_code);  
  console.log("Orderlist 1-20",username,"Time: ", end-start );  
  check(res, {"status is 200": (r) => r.status === 200 }); 
  sleep(5);


  //Order 201 - 400
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=20&num=20';
  data = {};
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
    end = Date.now();
    Page2.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  console.log("Orderlist 21-40",username,"Time: ", end-start );  
  sleep(5);


  //Order 401 - 600
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=40&num=20';
  data = {};
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
    end = Date.now();
    Page3.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  console.log("Orderlist 41-60",username,"Time: ", end-start );  
  sleep(5);

  //Order 601 - 800
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=60&num=20';
  data = {};
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
    end = Date.now();
    Page4.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  console.log("Orderlist 61-80",username,"Time: ", end-start );  
  sleep(5);

  //Order 801 - 1000
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=80&num=20';
  data = {};
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
    end = Date.now();
    Page5.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  console.log("Orderlist 81-100",username,"Time: ", end-start );  
  sleep(5);

  //Order 1001 - 1200
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=100&num=20';
  data = {};
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
    end = Date.now();
    Page6.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  console.log("Orderlist 101-120",username,"Time: ", end-start );  
  sleep(5);


  //Order 1201 - 1400
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=120&num=20';
  data = {};
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
    end = Date.now();
    Page7.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  console.log("Orderlist 121-140",username,"Time: ", end-start );  
  sleep(5);

  //Order 1401 - 1600
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=140&num=20';
  data = {};
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
    end = Date.now();
    Page8.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  console.log("Orderlist 141-160",username,"Time: ", end-start );  
  sleep(5);

  //Order 1601 - 1800
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=160&num=20';
  data = {};
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
    end = Date.now();
    Page9.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  console.log("Orderlist 161-180",username,"Time: ", end-start );  
  sleep(5);

  //Order 1801 - 2000
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=180&num=20';
  data = {};
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
    end = Date.now();
    Page10.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  console.log("Orderlist 181-200",username,"Time: ", end-start );  
  sleep(5);




    

}



