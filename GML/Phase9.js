import { group, check, sleep } from 'k6';
import http from 'k6/http';
import encoding from 'k6/encoding';
import { printerror } from './printerror.js';
import { trackinglist } from '../trackinglist.js';
// Version: 1.2
// Creator: WebInspector


const Phase9 = function (host1, ID_ORDER1, ID_OPER1, domain1, username1, password1, cookie1) {

	let res, redirectUrl, json;
	let host = host1;
	let ID_ORDER = ID_ORDER1;
	let ID_OPER = ID_OPER1;
	let domain = domain1;
	let username = username1;
	let password = password1;
	let cookie = cookie1;

	var obj;
	let bpasswordcorrect = false;

	let action_delay = 4;
	let end_delay = 5;
	let timeout = 120000;

	//click start , start execute
	var url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%2FLos_Angeles&ws_id=0&order_id=' + ID_ORDER + '&oper_id=' + ID_OPER + '&oper_name=PRODUCT_VALIDATION&action=1';
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
	try {
		var obj1 = res.json();
	}
	catch (err) {
		console.log('++++++++++phase9 : response is empty++++++++++++++++++++++++');
		return 0;
	}
	check(res, { "Result is 1": (r) => r.json().result === 1 });

	var test
	try {
		test = res.json()
	}
	catch (err) {
		console.log("##########Phase9", cookie)

		console.log("@@@@@@@@@@@@@@Phase9", JSON.stringify(res))
	}
	if (res.json().result != null) {
		if (res.json().result == 1) {
			//request success continue
			console.log(" Phase9 Ready!");
		}
		else {
			//request fail, return
			obj = res.json();
			printerror("Phase9-1", url, ID_ORDER, ID_OPER, obj);
			return 0;

		}
	}
	else {
		obj = res.json();
		printerror("Phase9-2", url, ID_ORDER, ID_OPER, obj);
		return 0;
	}

	var vmname = res.json().mobileScreen.vmName;
	//console.log("phase9 URL",res.request.url,"ERROR",res.error_code,"STATUS",res.status_text,"BODY",res.body)
	sleep(action_delay);
	//select
	url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=CHECK_LIST.tblCheckList&targetCompValue=true%7C0_0&sourceComp=&sourceCompValue=';
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
	try {
		var obj1 = res.json();
	}
	catch (err) {
		console.log('++++++++++phase9 : response is empty++++++++++++++++++++++++');
		return 0;
	}
	check(res, { "Result is 1": (r) => r.json().result === 1 });
	if (res.json().result != 1) {
		obj = res.json();
		printerror("Phase9", url, ID_ORDER, ID_OPER, obj);
	}
	sleep(action_delay);

	let waittime = 0;

	//We need to do sign till user/password is correct.
	while (!bpasswordcorrect) {
		//click OK
		url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=4&targetComp=CHECK_LIST.cmpFooter.txtUserId&targetCompValue=&sourceComp=CHECK_LIST.tblCheckList&sourceCompValue=true%7C0_0';
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
		try {
			var obj1 = res.json();
		}
		catch (err) {
			console.log('++++++++++phase9 : response is empty++++++++++++++++++++++++');
			return 0;
		}
		check(res, { "Result is 1": (r) => r.json().result === 1 });
		if (res.json().result != 1) {
			obj = res.json();
			printerror("Phase9", url, ID_ORDER, ID_OPER, obj);
		}
		sleep(action_delay);
		//@@@@@@@@@@@@	
		//enter comment
		url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=CHECK_LIST.cmpFooter.btnEnterComment&targetCompValue=yes&sourceComp=CHECK_LIST.cmpFooter.txtUserId&sourceCompValue=';
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
		try {
			var obj1 = res.json();
		}
		catch (err) {
			console.log('++++++++++phase9 : response is empty++++++++++++++++++++++++');
			return 0;
		}
		check(res, { "Result is 1": (r) => r.json().result === 1 });
		if (res.json().result != 1) {
			obj = res.json();
			printerror("Phase9", url, ID_ORDER, ID_OPER, obj);
		}
		sleep(action_delay);
		url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=3&targetComp=mobileMessageInputDialog&targetCompValue=16&targetCompExtraValue=test9';
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
		try {
			var obj1 = res.json();
		}
		catch (err) {
			console.log('++++++++++phase9 : response is empty++++++++++++++++++++++++');
			return 0;
		}
		check(res, { "Result is 1": (r) => r.json().result === 1 });
		if (res.json().result != 1) {
			obj = res.json();
			printerror("Phase9", url, ID_ORDER, ID_OPER, obj);
		}
		sleep(action_delay);
		//@@@@@@@@@@@@@@@

		//enter username
		url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=4&targetComp=CHECK_LIST.cmpFooter.txtUserId&targetCompValue=&sourceComp=CHECK_LIST.cmpFooter.btnEnterComment&sourceCompValue=';
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
		try {
			var obj1 = res.json();
		}
		catch (err) {
			console.log('++++++++++phase9 : response is empty++++++++++++++++++++++++');
			return 0;
		}
		check(res, { "Result is 1": (r) => r.json().result === 1 });
		if (res.json().result != 1) {
			obj = res.json();
			printerror("Phase9", url, ID_ORDER, ID_OPER, obj);
		}
		sleep(action_delay);

		url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=4&targetComp=CHECK_LIST.cmpFooter.pwdSignature&targetCompValue=undefined&sourceComp=CHECK_LIST.cmpFooter.txtUserId&sourceCompValue=' + domain + '%5C' + username;
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
		try {
			var obj1 = res.json();
		}
		catch (err) {
			console.log('++++++++++phase9 : response is empty++++++++++++++++++++++++');
			return 0;
		}
		check(res, { "Result is 1": (r) => r.json().result === 1 });
		if (res.json().result != 1) {
			obj = res.json();
			printerror("Phase9", url, ID_ORDER, ID_OPER, obj);
		}
		sleep(action_delay);

		//submit password
		let encodepassword = encoding.b64encode(password);
		url = 'http://' + host + '/ApemMobile/servlet/mobileExecutionServlet?tz=America%252FLos_Angeles&vmName=' + vmname + '&action=6&sourceComp=CHECK_LIST.cmpFooter.pwdSignature&sourceCompValue=' + encodepassword + '&sourceCompExtraValue=null';
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
		try {
			var obj1 = res.json();
		}
		catch (err) {
			console.log('++++++++++phase9 : response is empty++++++++++++++++++++++++');
			return 0;
		}
		check(res, { "Result is 1": (r) => r.json().result === 1 });
		if (res.json().result != 1) {
			obj = res.json();
			printerror("Phase9", url, ID_ORDER, ID_OPER, obj);
		}
		//check password issue
		if (res.json().mobileScreen != null && res.json().mobileScreen != undefined) {
			printerror("Phase9 Error", url, ID_ORDER, ID_OPER, res.json());
			if (res.json().mobileScreen.message == null || res.json().mobileScreen.message == undefined || res.json().mobileScreen.message == '') {
				bpasswordcorrect = true;
			}
			else if (JSON.stringify(res.json().mobileScreen.message).search("password") == -1) {
				//print error, get out;
				printerror("Phase9 general error: ", url, ID_ORDER, ID_OPER, res.json().mobileScreen.message);
				//retry it rather than abort the whole process.
				//return 0;
			} else {
				//password error
				printerror("Phase9 password error :", url, ID_ORDER, ID_OPER, res.json().mobileScreen.message);
			}
		}
		else {
			//no error
			bpasswordcorrect = true;
		}
		//console.log("phase5 URL",res.request.url,"ERROR",res.error_code,"STATUS",res.status_text,"BODY",res.body)	
		sleep(end_delay);

		//check the status
		//if the order last BP isn't ready, we need to re-sign the order.
		//let oper_name = 'PRODUCT_VALIDATION';
		//let phaseReady = trackinglist(host, ID_ORDER, oper_name, cookie);// GetID_OPER from trackinglist
		//if (phaseReady != null) {
			//the order is ready for next round.
		//	break;
		///}
		//else {
			//the last phase should be re-sign.
		//	waittime = waittime + action_delay;
		//	console.log("Phase9 check ready false, retry sign off, username#", username, "prderID#", ID_ORDER, "operName#", oper_name, "ID_ORDER not ready!!!", "wait for", waittime);
		//	sleep(action_delay);
		//	bpasswordcorrect = false;
		//}
	}


};
export { Phase9 }