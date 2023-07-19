import { group, check, sleep } from 'k6';
import {CreateComment_General} from './CreateComment_General.js';
import {CreateComment_Production} from './CreateComment_Production.js';
import {CreateComment_QC} from './CreateComment_QC.js';
import {CreateComment_Warehouse} from './CreateComment_Warehouse.js';


const PostComment = function(host1, ID_ORDER1, ID_OPER1,  cookie1) {
	
	
	let ID_ORDER = ID_ORDER1;
	let host = host1;
	let ID_OPER = ID_OPER1;
	let cookie = cookie1;

	let action_delay = 5;

	sleep(action_delay);

	//General create comment 
	CreateComment_General(host, ID_ORDER, ID_OPER, cookie); 
  

	sleep(action_delay);
	//Production create comment	
	CreateComment_Production(host, ID_ORDER, ID_OPER, cookie); 
		
	sleep(action_delay);
	//AC create comment
	CreateComment_QC(host, ID_ORDER, ID_OPER, cookie); 

	sleep(action_delay);
	//Warehouse create comment
	CreateComment_Warehouse(host, ID_ORDER, ID_OPER, cookie); 

	sleep(action_delay);
	 
}

export {PostComment}
