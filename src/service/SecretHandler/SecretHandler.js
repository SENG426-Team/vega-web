import {doPost} from '../BaseAPI.js';

const url = process.env.REACT_APP_FRONT_BACKEND_URL;

export function secretHandler(secretData){
	console.log("secretHandler", secretData);
	return doPost(url+"/api/venus/secret/add_secret", secretData);
}