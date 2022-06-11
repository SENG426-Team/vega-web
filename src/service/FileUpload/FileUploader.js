import {doPostFile, doGet} from '../BaseAPI.js';

const url = process.env.REACT_APP_FRONT_BACKEND_URL;

export function fileUploader(fileInfo, token){
	console.log("In File Uploader", token);
	return doPostFile(url+"/api/venus/upload", fileInfo, token);
}

export function fetchFiles(token){
	console.log("fetchFiles", token);
	return doGet(url+"/api/venus/listfiles", token)
}

export function fetchData(name, token){
	return doGet(url+"/api/venus/fetchcontent?name="+name, token)
}