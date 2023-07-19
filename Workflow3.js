import { group, check, sleep } from 'k6';
import http from 'k6/http';
import {Trend} from 'k6/metrics';
import {login} from './login.js';
import {orderlist2} from './orderlist2.js';
import {trackinglist} from './trackinglist.js';
import {Phase1} from './GML/Phase1.js';
import {Phase2} from './GML/Phase2.js';
import {Phase3} from './GML/Phase3.js';
import {Phase4} from './GML/Phase4.js';
import {Phase5} from './GML/Phase5.js';
import {Phase6} from './GML/Phase6.js';
import {Phase7} from './GML/Phase7.js';
import {Phase8} from './GML/Phase8.js';
import {Phase9} from './GML/Phase9.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';



export let options = {
    // vus:5
    stages: [
      { duration: '400s', target: 80 }, //ramp up 2 user 5 min
      { duration:'6h', target: 80 } //duration of run
    ],
};


const csvData = papaparse.parse(open('./data3.csv'), { header: true }).data;
let trend1 = new Trend('trend1');
let trend2 = new Trend('trend2');
let trend3 = new Trend('trend3');
let trend4 = new Trend('trend4');
let trend5 = new Trend('trend5');
let trend6 = new Trend('trend6');
let trend7 = new Trend('trend7');
let trend8 = new Trend('trend8');
let map = new Map();
let map1 = new Map();

export default function () {
  
  let index = __VU % csvData.length - 1;
  const record = csvData[index]

  let username =record.username1;
  let password = record.password1;
  let order_cod = record.order_cod;
  let username2 =record.username2;
  let password2 = record.password2;
  let host = record.host;
  let domain = record.domain;


  let ID_ORDER,ID_OPER,oper_name;
  let start, end;
  
 

  let action_delay = 2;
  let basic_delay = 5;
  let end_waite_time = 20;

  //login   
  if(map[username] == null){
    //login
    map[username] = login(username, password, host, domain);
    sleep(1);
    
    console.log("Logged in as ", username, map[username]);//console username password
  }
  
  let cookie = map[username];

  if(map1[username] == null){
    map1[username] = orderlist2(host, order_cod, cookie);// GetID Order from orderlist
    sleep(basic_delay);
  }
  ID_ORDER =map1[username];

  console.log( ID_ORDER)

 
  
 
  console.log("PHASE 1  -------------------------");
  oper_name = 'INTRODUCTION';
  while(true){
    ID_OPER = trackinglist(host, ID_ORDER,oper_name, cookie);// GetID_OPER from trackinglist
    if(ID_OPER != null){
      break;
    }
    else{
      console.log("username#",username,"prderID#", ID_ORDER, "operName#", oper_name, "ID_ORDER not ready!!!")
      sleep(1);
    }

  }
  sleep(basic_delay);
  Phase1(host, ID_ORDER, ID_OPER, cookie, action_delay);
  console.log('Phase1 execute complete*************', 'orderId#', ID_ORDER, 'username#', username, 'Code#', order_cod)
  
  
  
  console.log("PHASE 2  -------------------------");
  oper_name = 'EQUIPMENT_SELECTION';
  start = Date.now(); 
  while(true){
    ID_OPER = trackinglist(host, ID_ORDER,oper_name, cookie);// GetID_OPER from trackinglist
    if(ID_OPER != null){
      break;
    }
    else{
      console.log("username#",username,"prderID#", ID_ORDER, "operName#", oper_name, "ID_ORDER not ready!!!")
      sleep(1)
    }

  }
  
  end = Date.now(); 
  trend1.add(end-start);
  sleep(basic_delay);
  Phase2(host, ID_ORDER, ID_OPER, cookie);
  console.log('Phase2 execute complete*************', 'orderId#', ID_ORDER, 'username#', username, 'Code#', order_cod)
  

  console.log("PHASE 3  -------------------------");
  oper_name = 'STARTUP_CHECKLIST';
  start = Date.now(); 
  while(true){
    ID_OPER = trackinglist(host, ID_ORDER,oper_name, cookie);// GetID_OPER from trackinglist
    if(ID_OPER != null){
      break;
    }
    else{
      console.log("username#",username,"prderID#", ID_ORDER, "operName#", oper_name, "ID_ORDER not ready!!!")
      sleep(1);
    }

  }
  end = Date.now(); 
  trend2.add(end-start);
  sleep(basic_delay);
  Phase3(host, ID_ORDER, ID_OPER, domain , username, password, cookie);
  
  console.log('Phase3 execute complete*************', 'orderId#', ID_ORDER, 'username#', username, 'Code#', order_cod)

  console.log("PHASE 4  -------------------------");
  oper_name = 'STARTUP_INSTRUCTION';
  start = Date.now(); 
  while(true){
    ID_OPER = trackinglist(host, ID_ORDER,oper_name, cookie);// GetID_OPER from trackinglist
    if(ID_OPER != null){
      break;
    }
    else{
      console.log("username#",username,"prderID#", ID_ORDER, "operName#", oper_name, "ID_ORDER not ready!!!")
      sleep(1);
    }

  }
  end = Date.now(); 
  trend3.add(end-start);
  sleep(basic_delay);
  Phase4(host, ID_ORDER, ID_OPER, domain , username, password, cookie);
  
  console.log('Phase4 execute complete*************', 'orderId#', ID_ORDER, 'username#', username, 'Code#', order_cod)

  console.log("PHASE 5  -------------------------");
  oper_name = 'FILLING_MEASUREMENT_1';
  start = Date.now(); 
  while(true){
    ID_OPER = trackinglist(host, ID_ORDER,oper_name, cookie);// GetID_OPER from trackinglist
    if(ID_OPER != null){
      break;
    }
    else{
      console.log("username#",username,"prderID#", ID_ORDER, "operName#", oper_name, "ID_ORDER not ready!!!")
      sleep(1);
    }

  }
  //console.log(ID_OPER)
  end = Date.now(); 
  trend4.add(end-start);
  sleep(basic_delay);
  Phase5(host, ID_ORDER, ID_OPER, domain , username, password, cookie);
  
  console.log('Phase5 execute complete*************', 'orderId#', ID_ORDER, 'username#', username, 'Code#', order_cod)

  console.log("PHASE 6  -------------------------");
  oper_name = 'FILLING_MEASUREMENT_2';
  start = Date.now(); 
  while(true){
    ID_OPER = trackinglist(host, ID_ORDER,oper_name, cookie);// GetID_OPER from trackinglist
    if(ID_OPER != null){
      break;
    }
    else{
      console.log("username#",username,"prderID#", ID_ORDER, "operName#", oper_name, "ID_ORDER not ready!!!")
      sleep(1);
    }

  }
  
  end = Date.now();
  trend5.add(end-start);
  sleep(basic_delay);
  Phase6(host, ID_ORDER, ID_OPER, domain , username, password, username2, password2, cookie);
  
  console.log('Phase6 execute complete*************', 'orderId#', ID_ORDER, 'username#', username, 'Code#', order_cod)

  console.log("PHASE 7  -------------------------");
  oper_name = 'MIXING_MEASUREMENT';
  start = Date.now(); 
  while(true){
    ID_OPER = trackinglist(host, ID_ORDER,oper_name, cookie);// GetID_OPER from trackinglist
    if(ID_OPER != null){
      break;
    }
    else{
      console.log("username#",username,"prderID#", ID_ORDER, "operName#", oper_name, "ID_ORDER not ready!!!")
      sleep(1);
    }

  }
  end = Date.now(); 
  trend6.add(end-start);
  sleep(basic_delay)
  Phase7(host, ID_ORDER, ID_OPER, domain , username, password, cookie);
  
  console.log('Phase7 execute complete*************', 'orderId#', ID_ORDER, 'username#', username, 'Code#', order_cod)

  console.log("PHASE 8  -------------------------");
  oper_name = 'MIXING_SAMPLING';
  start = Date.now(); 
  while(true){
    ID_OPER = trackinglist(host, ID_ORDER,oper_name, cookie);// GetID_OPER from trackinglist
    if(ID_OPER != null){
      break;
    }
    else{
      console.log("username#",username,"prderID#", ID_ORDER, "operName#", oper_name, "ID_ORDER not ready!!!")
      sleep(1);
    }

  }
  end = Date.now(); 
  trend7.add(end-start);
  sleep(basic_delay);
  Phase8(host, ID_ORDER, ID_OPER, domain , username, password, cookie);
  
  console.log('Phase8 execute complete*************', 'orderId#', ID_ORDER, 'username#', username, 'Code#', order_cod)

  console.log("PHASE 9  -------------------------");
  oper_name = 'PRODUCT_VALIDATION';
  start = Date.now(); 
  while(true){
    ID_OPER = trackinglist(host, ID_ORDER,oper_name, cookie);// GetID_OPER from trackinglist
    if(ID_OPER != null){
      break;
    }
    else{
      console.log("username#",username,"prderID#", ID_ORDER, "operName#", oper_name, "ID_ORDER not ready!!!")
      sleep(1);
    }

  }

  end =  Date.now(); 
  trend8.add(end-start);
  sleep(basic_delay);
  Phase9(host, ID_ORDER, ID_OPER, domain , username, password, cookie);
  
  console.log('Phase9 execute complete*************', 'orderId#', ID_ORDER, 'username#', username, 'Code#', order_cod)



 

}