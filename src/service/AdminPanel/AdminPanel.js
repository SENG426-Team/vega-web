import {doPostFile, doGet} from '../BaseAPI.js';

const url = process.env.REACT_APP_FRONT_BACKEND_URL;

export function fetchuser(token){
	return doGet(url+"/api/venus/admin/getusers", token)
}

export function enableAccount(username,token){
	return doGet(url+"/api/venus/admin/enableuser?enable=true&username="+username, token)	
}

export function changeAccountRole(username, role, token){
	return doGet(url+"/api/venus/admin/changerole?username="+username+"&role="+role, token)
}