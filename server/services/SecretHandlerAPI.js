import {doPost} from './HTTPRequestAPI.js';

export function add_secret(url, data, headers){
	return doPost(url, data, headers);
}