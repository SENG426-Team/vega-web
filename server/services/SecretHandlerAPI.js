
import {doPostSecret} from './HTTPRequestAPI.js';

export function add_secret(url, data, headers){
	return doPostSecret(url, data, headers['authorization']);
}

export function fetch_secrets(url, data, headers){
	return doPostSecret(url, data, headers['authorization']);
}

export function fetch_shared_secrets(url, data, headers){
	return doPostSecret(url, data, headers['authorization']);
}

export function delete_secret(url, data, headers){
	return doPostSecret(url, data, headers['authorization']);
} 

export function share_secret(url, data, headers){
	return doPostSecret(url, data, headers['authorization']);
}