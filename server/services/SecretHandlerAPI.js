import {doPost} from './HTTPRequestAPI.js';

export function add_secret(url, data){
	console.log("Hello there");
	return doPost(url, data);
}