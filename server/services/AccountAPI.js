import {doPost} from './HTTPRequestAPI.js';

export function create_account(url, data){
	return doPost(url, data);
}