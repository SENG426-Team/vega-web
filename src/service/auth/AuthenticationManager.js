import {doPost} from '../BaseAPI.js';

const url = process.env.REACT_APP_FRONT_BACKEND_URL;

export function login(userInfo){
	console.log("In Auth", userInfo);
	return doPost(url+"/api/login", userInfo);
}