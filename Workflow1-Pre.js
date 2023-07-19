import { group, check, sleep } from 'k6';
import http from 'k6/http';
import { login } from './login.js';
import { orderlist } from './orderlist.js';
import { trackinglist } from './trackinglist.js';
import { viewComment } from './viewComment.js';
import { PostComment } from './PostComment.js';
import { Trend } from 'k6/metrics';

import { CreateComment_General } from './CreateComment_General.js';
import { CreateComment_Production } from './CreateComment_Production.js';
import { CreateComment_QC } from './CreateComment_QC.js';
import { CreateComment_Warehouse } from './CreateComment_Warehouse.js';

import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';







const csvData = papaparse.parse(open('./data.csv'), { header: true }).data;
let map = new Map();
let map1 = new Map();
let map2 = new Map();

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

 



  for(let i = 0 ; i < 4; i++){
    //manager create comment

    let order_cod1 = 'C' + (parseInt(order_cod) + i);

    //console.log(order_cod1);


    ID_ORDER = orderlist(host, order_cod1, cookie);// GetID Order from orderlist
    console.log(ID_ORDER)

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
  
    
    
    


  



}