import {doPost} from './HTTPRequestAPI.js';

export function add_secret(url, data){
	return doPost(url, data);
}