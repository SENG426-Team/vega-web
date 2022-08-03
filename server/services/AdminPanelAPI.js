import {doPostWithToken, doGet} from './HTTPRequestAPI.js';

export function fetchusers(url, headers){
	console.log(headers);
	return doGet(url, headers['authorization'])
}

export function enableAccount(url, data, headers){
	console.log(headers);
	console.log(url);
	return doPostWithToken(url, data, headers['authorization'])
}

export function changeRole(url,headers){
	console.log(url);
	return doGet(url, headers['authorization'])
}