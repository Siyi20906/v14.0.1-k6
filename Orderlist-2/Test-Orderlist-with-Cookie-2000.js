import { group, check, sleep } from 'k6';
import http from 'k6/http';
import {login} from './login.js';
import papaparse from './index.js';
import {Trend} from 'k6/metrics'

let Trend1 = new Trend('Trend1');
let Trend2 = new Trend('Trend2');
let Trend3 = new Trend('Trend3');
let Trend4 = new Trend('Trend4');
let Trend5 = new Trend('Trend5');
let Trend6 = new Trend('Trend6');
let Trend7 = new Trend('Trend7');
let Trend8 = new Trend('Trend8');
let Trend9 = new Trend('Trend9');
let Trend10 = new Trend('Trend10');

export let options = {
    // vus:5
    stages: [
      {duration:'500s',target:100},
      {duration:'10m',target:100},
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
start = Date.now();
  map[username] = login(username, password, host, domain); 
end = Date.now();
  console.log("Logged in as ", username, map[username] + " Time:", end-start);//console username password
}

cookie = map[username];
//console.log(username, "cookie" , cookie);
//console.log(" ");
let timeout = 120000;
  sleep(1000);
return;
 
  //orderlist
  //Order 1 - 200
  var url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=0&num=200';
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
    Trend1.add(end-start);

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
  let body = JSON.parse(res.body);
  console.log("Orderlist 1-200",username,"Time: ", end-start, " length: ", JSON.stringify(body).length );  
  check(res, {"status is 200": (r) => r.status === 200 }); 
  sleep(5);


  //Order 201 - 400
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=200&num=200';
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
    Trend2.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  body = JSON.parse(res.body);
  console.log("Orderlist 201-400",username,"Time: ", end-start, " length: ", JSON.stringify(body).length );  
  sleep(5);


  //Order 401 - 600
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=400&num=200';
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
    Trend3.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  body = JSON.parse(res.body);
  console.log("Orderlist 401-600",username,"Time: ", end-start, " length: ", JSON.stringify(body).length );  
  sleep(5);

  //Order 601 - 800
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=600&num=200';
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
    Trend4.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  body = JSON.parse(res.body);
  console.log("Orderlist 601-800",username,"Time: ", end-start, " length: ", JSON.stringify(body).length );  
  sleep(5);

  //Order 801 - 1000
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=800&num=200';
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
    Trend5.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  body = JSON.parse(res.body);
  console.log("Orderlist 801-1000",username,"Time: ", end-start, " length: ", JSON.stringify(body).length );  
  sleep(5);

  //Order 1001 - 1200
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=1000&num=200';
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
    Trend6.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  body = JSON.parse(res.body);
  console.log("Orderlist 1001-1200",username,"Time: ", end-start, " length: ", JSON.stringify(body).length );  
  sleep(5);


  //Order 1201 - 1400
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=1200&num=200';
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
    Trend7.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  body = JSON.parse(res.body);
  console.log("Orderlist 1201-1400",username,"Time: ", end-start, " length: ", JSON.stringify(body).length );  
  sleep(5);

  //Order 1401 - 1600
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=1400&num=200';
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
    Trend8.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  body = JSON.parse(res.body);
  console.log("Orderlist 1401-1600",username,"Time: ", end-start, " length: ", JSON.stringify(body).length );  
  sleep(5);

  //Order 1601 - 1800
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=1600&num=200';
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
    Trend9.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  body = JSON.parse(res.body);
  console.log("Orderlist 1601-1800",username,"Time: ", end-start, " length: ", JSON.stringify(body).length );  
  sleep(5);

  //Order 1801 - 2000
  url = 'http://' + host + '/ApemMobile/servlet/mobileOrderListServlet?tz=UTC&states=0%7C6%7C3%7C2&init=1800&num=200';
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
    Trend10.add(end-start);

  check(res, {"status is 200": (r) => r.status === 200 }); 
  body = JSON.parse(res.body);
  console.log("Orderlist 1801-2000",username,"Time: ", end-start, " length: ", JSON.stringify(body).length );  
  sleep(5);




    

}



