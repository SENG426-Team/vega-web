import {doPost} from '../BaseAPI.js';

const url = process.env.REACT_APP_FRONT_BACKEND_URL;

export function secretHandler(secretInfo){
	console.log("In Secret Handler");
	return doPost(url+"/api/venus/secret/add_secret", secretInfo);
}