import {doPostWithToken, doGet, doPost} from './HTTPRequestAPI.js';

export function fetchusers(url, headers){
	console.log(headers);
	return doGet(url, headers['authorization'])
}

export function enableAccount(url, data, headers){
	return doPostWithToken(url, data, headers['authorization'])
}

export function changeRole(url, data, headers){
	return doPostWithToken(url, data, headers['authorization'])
}