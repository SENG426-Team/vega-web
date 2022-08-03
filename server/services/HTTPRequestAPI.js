import fetch from 'node-fetch';
import FormData from 'form-data';
import Promise from 'promise';

export async function doPost(url, data){
	const response = await fetch(url, createRequestOptions('POST', data));
	return await handleResponse(response);
}

export async function doGet(url, token){
  const response = await fetch(url, createRequestOptions('GET', undefined, token));
  return await handleResponse(response);
}

export async function doPostWithToken(url, data, token){
	const response = await fetch(url, createRequestOptions('POST', data, token));
	return await handleResponse(response);
}

export async function doPostFile(url, data, headers){
  var file_name = data.file.name;
  var file_data = data.file.data;
  const response = await fetch(url, createRequestOptionsForFile('POST', file_name, file_data, headers));
  return await handleResponse(response);
}

// https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
// For some reason, File.append("file", data.file) does not work.
// Therefore, must use the longer version found in the above link
function createRequestOptionsForFile(method, file_name, file_data, headers){
  var File = new FormData();
  File.append("file", file_data, file_name);
  var requestOptions = {
    'method': method,
    'headers': {
      'Authorization': headers['authorization']
    },
    'body': File
    }

  console.log(requestOptions)
  return requestOptions;
}

function  createRequestOptions(method, data, token){
  var requestOptions = {
    'method': method,
    'dataType': 'json',
    'headers': {
      'authorization': token,
      'content-type': 'application/json'
    }
  }
  if(data){
    requestOptions.body = JSON.stringify(data);
  }
  return requestOptions;
}

export async function handleResponse(response) {
  let result;
 
   result = handleJSONResult(await response.text());
  if (response.ok) {
    return result;
  }
  // handle error
  console.warn('Response is not OK:', response.status);
  console.warn('Response body:', result);
  let message = response.statusText; // by default
  if (result && result.message) {
    message = result.message;
  } else if (result && result.description) {
    message = result.description;
  }
  return Promise.reject({
    code: response.status,
    message: message
  });
}

export function handleJSONResult(result) {
  try {
    return JSON.parse(result);
  } catch (error) {
    console.info('Response is not a valid json. Processing it as a text.');
    return result;
  }
}
