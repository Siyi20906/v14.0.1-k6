import { group, check, sleep } from 'k6';
import http from 'k6/http';
import { Trend } from "k6/metrics";
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

import { login } from './login.js';
import { orderlist2 } from './orderlist2.js';
import { trackinglist } from './trackinglist.js';



export let options = {
    // vus:5
    stages: [
      { duration: '400s', target: 80 }, //ramp up 2 user 5 min
      { duration:'6h', target: 80 } //duration of run
    ],
};


const csvData = papaparse.parse(open('./data2.csv'), { header: true }).data;
let refreshTime = new Trend('refresh_time');
let bomOpenTime = new Trend('bom_open_time');

let map = new Map();
let map1 = new Map();

let action_delay = 2;
let basic_delay = 5;
let end_delay = 20;
let timeout = 120000;


export default function () {

  let index = __VU % csvData.length - 1;
  const record = csvData[index]

  let username = record.username;
  let password = record.password;
  let host = record.host;
  let domain = record.domain;

  let order_cod = record.order_cod;



  let ID_ORDER, ID_OPER, cookie;
  let res;
  let vmname, start, end;


  //login   
  if (map[username] == null) {
    //login
    map[username] = login(username, password, host, domain);
    sleep(action_delay);

    console.log("Logged in as ", username, map[username]);//console username password
  }

  cookie = map[username];


//Get ID_Order
  if (map1[username] == null) {
    map1[username] = orderlist2(host, order_cod, cookie);// GetID Order from orderlist
    sleep(basic_delay);

  }
  ID_ORDER = map1[username];


//Get ID_Oper
  let oper_name = 'ORDER_MANAGEMENT';

  while (true) {
    ID_OPER = trackinglist(host, ID_ORDER, oper_name, cookie);// GetID_OPER from trackinglist
    if (ID_OPER != null) {
      break;
    }
    else {
      console.log("username#", username, "prderID#", ID_ORDER, "operName#", oper_name, "ID_ORDER not ready!!!")
      sleep(basic_delay);
    }
  }



  //click start , start execute
  var url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%2FLos_Angeles&ws_id=0&order_id=' + ID_ORDER + '&oper_id=' + ID_OPER + '&oper_name=ORDER_MANAGEMENT&action=1';
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
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  //console.log(res.body)

  try {
    vmname = res.json().mobileScreen.vmName;
  }
  catch (err) {
    console.log("#######GetVMname", JSON.stringify(res))
    return 0;
  }

  //get vmName
  vmname = res.json().mobileScreen.vmName;
  //console.log(vmname);
  sleep(action_delay);

  //select Area
  //Area dropdown box
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=ORDER_STATUS.CmbArea&targetCompValue=&sourceComp=&sourceCompValue=';
  
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
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  
  if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}
  sleep(action_delay);

  //select an area
  start = Date.now();
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=9&targetComp=ORDER_STATUS.CmbArea&targetCompValue=COMPOUNDING&sourceComp=ORDER_STATUS.CmbArea&sourceCompValue=';
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
    end = Date.now();
    if (res.json().result == 1) {
      console.log("Refresh Time")
      refreshTime.add(end - start);
    }
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}
  sleep(action_delay);

  //unselect area
  start = Date.now();
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=ORDER_STATUS.ChkArea&targetCompValue=false&sourceComp=ORDER_STATUS.CmbArea&sourceCompValue=COMPOUNDING';
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
    end = Date.now();
    if (res.json().result == 1) {
      console.log("Refresh Time")
      refreshTime.add(end - start);
    }
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}
  sleep(action_delay);

  //Product dropdown box
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=ORDER_STATUS.CmbProductionLine&targetCompValue=&sourceComp=ORDER_STATUS.ChkArea&sourceCompValue=';
  //console.log(url)
  //&action=3&targetComp=ORDER_STATUS.CmbProductionLine&targetCompValue=&sourceComp=ORDER_STATUS.ChkArea&sourceCompValue=
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
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}
  sleep(action_delay);

  //select an product
  start = Date.now();
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=9&targetComp=ORDER_STATUS.CmbProductionLine&targetCompValue=First%20Compounding%20Line&sourceComp=ORDER_STATUS.CmbProductionLine&sourceCompValue=';
  //console.log(url)
  //&action=9&targetComp=ORDER_STATUS.CmbProductionLine&targetCompValue=First%20Compounding%20Line&sourceComp=ORDER_STATUS.CmbProductionLine&sourceCompValue=
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
    end = Date.now();
    if (res.json().result == 1) {
      console.log("Refresh Time")
      refreshTime.add(end - start);
    }
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}
  sleep(action_delay);

  //unselect the product
  start = Date.now();
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=ORDER_STATUS.ChkProductionLine&targetCompValue=false&sourceComp=ORDER_STATUS.CmbProductionLine&sourceCompValue=First%20Compounding%20Line';
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
    end = Date.now();
    if (res.json().result == 1) {
      console.log("Refresh Time")
      refreshTime.add(end - start);
    }
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}
  sleep(action_delay);

  //productline dropdown box 
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=ORDER_STATUS.cmbProductDescription&targetCompValue=&sourceComp=ORDER_STATUS.ChkProductionLine&sourceCompValue=';
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
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}
  sleep(action_delay);

  //select productline
  start = Date.now();
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=9&targetComp=ORDER_STATUS.cmbProductDescription&targetCompValue=Aspeglical%20800&sourceComp=ORDER_STATUS.cmbProductDescription&sourceCompValue=';
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
    end = Date.now();
    if (res.json().result == 1) {
      console.log("Refresh Time")
      refreshTime.add(end - start);
    }
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}
  sleep(action_delay);

  //unselet the productline
  start = Date.now();
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=ORDER_STATUS.ChkProductDescription&targetCompValue=false&sourceComp=ORDER_STATUS.cmbProductDescription&sourceCompValue=Aspeglical%20800';
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
    end = Date.now();
    if (res.json().result == 1) {
      console.log("Refresh Time")
      refreshTime.add(end - start);
    }
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}
  sleep(action_delay);

  //unselect received
  start = Date.now();
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=ORDER_STATUS.ChkReceived&targetCompValue=false&sourceComp=ORDER_STATUS.ChkProductionLine&sourceCompValue=';
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
    end = Date.now();
    if (res.json().result == 1) {
      console.log("Refresh Time")
      refreshTime.add(end - start);
    }
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}
  sleep(action_delay);

  //select received
  start = Date.now();
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=ORDER_STATUS.ChkReceived&targetCompValue=true&sourceComp=ORDER_STATUS.ChkReceived&sourceCompValue=';
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
    end = Date.now();
    if (res.json().result == 1) {
      console.log("Refresh Time")
      refreshTime.add(end - start);
    }
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}
  sleep(action_delay);

  //select an order

  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=ORDER_STATUS.TblOrders&targetCompValue=COMPOUNDING%7C1_1&sourceComp=ORDER_STATUS.BtnViewBOM&sourceCompValue=';
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
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}
  sleep(action_delay);


  //viewBom
  start = Date.now();

  //click viewBom
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=ORDER_STATUS.BtnViewBOM&targetCompValue=yes&sourceComp=ORDER_STATUS.TblOrders&sourceCompValue=COMPOUNDING%7C1_1';
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

  end = Date.now();
  if (res.json().result == 1) {
    console.log("View Bom")
    bomOpenTime.add(end - start);
  }
  if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}

  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(action_delay);



  //click close
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=VIEW_BOM.btnClose&targetCompValue=yes&sourceComp=ORDER_STATUS.BtnViewBOM&sourceCompValue=';
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
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}
  sleep(action_delay);


  //click yes
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=mobileMessageDialog&targetCompValue=1&targetCompExtraValue=null';
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
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  sleep(action_delay);
  if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}



  //Enter Comment

  //select
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=ORDER_STATUS.TblOrders&targetCompValue=MIXING%7C3_1&sourceComp=ORDER_STATUS.TblOrders&sourceCompValue=COMPOUNDING%7C1_1';
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
    if(res.json().result != 1){
      console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
    }
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  sleep(action_delay);


  //click enter comment
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=ORDER_STATUS.BtnEnterComment&targetCompValue=yes&sourceComp=ORDER_STATUS.TblOrders&sourceCompValue=MIXING%7C3_1';
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
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  if(res.json().result != 1){
		console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
	}
  sleep(basic_delay);

  //submit comment
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=mobileMessageInputDialog&targetCompValue=16&targetCompExtraValue=Workflow2view1';
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
    if(res.json().result != 1){
      console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
    }
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  console.log("Enter comment")
  sleep(action_delay);


  //view Comment

  //click view
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=ORDER_STATUS.BtnViewComments&targetCompValue=yes&sourceComp=ORDER_STATUS.TblOrders&sourceCompValue=COMPOUNDING%7C2_1';
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
    if(res.json().result != 1){
      console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
    }
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  console.log("View comment")
  sleep(basic_delay);

  //click ok
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=mobileMessageInputDialog&targetCompValue=16&targetCompExtraValue=0';
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
    if(res.json().result != 1){
      console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
    }
  check(res, { "status is 200": (r) => r.status === 200 });
  check(res, {"Result is 1": (r) => r.json().result === 1 }); 
  sleep(action_delay);


  //Exit
  url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=ORDER_STATUS.BtnExit&targetCompValue=yes&sourceComp=ORDER_STATUS.CmbArea&sourceCompValue=';
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
    if(res.json().result != 1){
      console.log("####url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER,res.body)
    }
  check(res, { "status is 200": (r) => r.status === 200 });
  console.log("URL", res.request.url, "ERROR", res.error_code, "STATUS", res.status_text)
  sleep(end_delay);
}