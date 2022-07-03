import {doPostSecret} from '../BaseAPI.js';

const url = process.env.REACT_APP_FRONT_BACKEND_URL;

export function secretHandler(secretData, token){
	console.log("secretHandler", secretData);
	return doPostSecret(url+"/api/venus/secret/add_secret", secretData, token);
}

export function fetchSecrets(userData, token){
	console.log("fetchSecrets", userData);
	return doPostSecret(url+"/api/venus/secret/fetch_secrets", userData, token);
}

export function fetchSharedSecrets(userData, token){
	console.log("fetchShareSecrets", userData);
	return doPostSecret(url+"/api/venus/secret/fetch_shared_secrets", userData, token);
}

export function shareSecret(secretData, token){
	console.log("shareSecret", secretData);
	return doPostSecret(url+"/api/venus/secret/share_secret", secretData, token);
}

export function deleteSecret(secret_id, token){
	console.log("deleteSecret", secret_id);
	return doPostSecret(url+"/api/venus/secret/delete_secret", secret_id, token);
}

