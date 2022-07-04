import {doPost} from '../BaseAPI.js';

const url = process.env.REACT_APP_FRONT_BACKEND_URL;

export function createAccount(userData){
	console.log("createAccount", userData);
	return doPost(url+"/api/venus/account/create", userData);
}