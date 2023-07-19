
// Version: 1.2
// Creator: WebInspector



const printerror = function(phase1, url1, ID_ORDER1, ID_OPER1, obj1) {
	
	let phase = phase1;
	let url = url1;
	let ID_ORDER = ID_ORDER1;
	let ID_OPER = ID_OPER1;
	let obj = JSON.stringify(obj1)


	console.log(phase, "url:", url, "ID_ODER",ID_ORDER ,"ID_OPER",ID_OPER, obj)
	
		
	
};
export {printerror}


