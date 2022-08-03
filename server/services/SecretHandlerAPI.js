
import {doPostWithToken} from './HTTPRequestAPI.js';

export function add_secret(url, data, headers){
	return doPostWithToken(url, data, headers['authorization']);
}

export function fetch_secrets(url, data, headers){
	return doPostWithToken(url, data, headers['authorization']);
}

export function fetch_shared_secrets(url, data, headers){
	return doPostWithToken(url, data, headers['authorization']);
}

export function delete_secret(url, data, headers){
	return doPostWithToken(url, data, headers['authorization']);
} 

export function share_secret(url, data, headers){
	return doPostWithToken(url, data, headers['authorization']);
}

export function create_account(url, data){
	return doPost(url, data);
}