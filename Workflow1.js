import { group, check, sleep } from 'k6';
import http from 'k6/http';
import { login } from './login.js';
import { orderlist2 } from './orderlist2.js';
import { trackinglist } from './trackinglist.js';
import { viewComment } from './viewComment.js';
import { PostComment } from './PostComment.js';
import { Trend } from 'k6/metrics';

import { CreateComment_General } from './CreateComment_General.js';
import { CreateComment_Production } from './CreateComment_Production.js';
import { CreateComment_QC } from './CreateComment_QC.js';
import { CreateComment_Warehouse } from './CreateComment_Warehouse.js';

import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';



export let options = {
  // vus:5
  stages: [
    { duration: '400s', target: 80 }, //ramp up 2 user 5 min
    { duration: '6h', target: 80 } //duration of run
  ],
};

let viewwaite2 = new Trend('viewwaite2');

const csvData = papaparse.parse(open('./data1.csv'), { header: true }).data;
let map = new Map();
let map1 = new Map();


let action_delay = 2;
let basic_delay = 5;



export default function () {

  let index = __VU % csvData.length - 1;
  const record = csvData[index]

  //Get data from csv
  let username = record.username;
  let password = record.password;
  let host = record.host;
  let domain = record.domain;


  let role = record.role;
  let order_cod = record.order_cod;
  let oper_name = record.oper_name;

  let ID_ORDER, ID_OPER, cookie;


  //save cookie   
  if (map[username] == null) {
    //login
    map[username] = login(username, password, host, domain);

    console.log("Logged in as ", username, map[username]);//console username password
  }

  cookie = map[username];
  /*
  if(cookie == 'Asia/Shanghai'){
    console.log(map)
  }
   */
  if (map1[username] == null) {
    map1[username] = orderlist2(host, order_cod, cookie);// GetID Order from orderlist
    sleep(basic_delay);
  }

  ID_ORDER = map1[username];






  if (role == "manager") {
    //manager create comment

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
    
  
    PostComment(host, ID_ORDER, ID_OPER, cookie);
  
    
    
    
  }

  else {
    //not manager view comment


    let start = Date.now();
    let i = 0;
    while (true) {
      ID_OPER = trackinglist(host, ID_ORDER, oper_name, cookie);// GetID_OPER from trackinglist
      if (ID_OPER != null) {
        break;
      }
      else {
        console.log("username#", username, "prderID#", ID_ORDER, "operName#", oper_name, "ID_ORDER not ready!!!")
        sleep(1);
        i++;
      }
    }
    let end = Date.now();
    
      check(i, {"Retry < 20": (i) => i<20 }); 
      viewwaite2.add(end - start);

    
    
    viewComment(host, ID_ORDER, ID_OPER, cookie);
    sleep(basic_delay);
  
 

  }

  //console.log("VU = "+__VU+" Username = "+username+" Password = "+password+" Order Code = "+order_cod+" Operation name = "+oper_name);

  //CreateComment_General(host, ID_ORDER, ID_OPER, cookie); 
  // CreateComment_Production(host, ID_ORDER, ID_OPER, cookie); 
  // CreateComment_QC(host, ID_ORDER, ID_OPER, cookie);
  //CreateComment_Warehouse(host, ID_ORDER, ID_OPER, cookie);

  // viewComment(host,ID_ORDER,ID_OPER,tz, cookie);

}