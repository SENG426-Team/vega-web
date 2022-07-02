import {doPostFile, doGet} from './HTTPRequestAPI.js';
import {doPost} from './HTTPRequestAPI.js';

export function fetchusers(url, headers){
	console.log(headers);
	return doGet(url, headers['authorization'])
}

export function enableAccount(url, headers){
	console.log(headers);
	console.log(url);
	return doGet(url, headers['authorization'])
}

export function changeRole(url,headers){
	console.log(url);
	return doGet(url, headers['authorization'])
}

export function addUser(url, data, headers){
	console.log(headers);
	console.log(url);
	return doPost(url, data, headers)
}