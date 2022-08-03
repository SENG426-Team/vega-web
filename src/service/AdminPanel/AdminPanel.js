import {doPostWithToken, doGet} from '../BaseAPI.js';

const url = process.env.REACT_APP_FRONT_BACKEND_URL;

export function fetchuser(token){
	return doGet(url+"/api/venus/admin/getusers", token)
}

export function enableAccount(user_data, token){
	return doPostWithToken(url+"/api/venus/admin/enableuser", user_data, token)	
}

export function changeAccountRole(role_data, token){
	return doPostWithToken(url+"/api/venus/admin/changerole", role_data, token)
}