import bodyParser from 'body-parser';
import express from 'express';
import {add_secret, fetch_secrets, fetch_shared_secrets, delete_secret, share_secret} from '../services/SecretHandlerAPI.js';
import fileUpload from 'express-fileupload';
import { config } from 'dotenv';

const env = config();
const url = process.env.BACKEND_URL;

let router = express();

router.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

router.post("/add_secret", (req,res) => {
    add_secret(url+"/venus/secret/add_secret", req.body, req.headers)
    		.then(response => {
    			console.log("Response", response);
    			res.send(response);
    		})
    		.catch(error => {
    			console.log("ERROR:", error);
    			res.send(error);
    		})
})

router.post("/fetch_secrets", (req,res) => {
    fetch_secrets(url+"/venus/secret/fetch_secrets", req.body, req.headers)
    		.then(response => {
    			console.log("Response", response);
    			res.send(response);
    		})
    		.catch(error => {
    			console.log("ERROR:", error);
    			res.send(error);
    		})
})

router.post("/fetch_shared_secrets", (req,res) => {
    fetch_shared_secrets(url+"/venus/secret/fetch_shared_secrets", req.body, req.headers)
    		.then(response => {
    			console.log("Response", response);
    			res.send(response);
    		})
    		.catch(error => {
    			console.log("ERROR:", error);
    			res.send(error);
    		})
})

router.post("/share_secret", (req,res) => {
    share_secret(url+"/venus/secret/share_secret", req.body, req.headers)
    		.then(response => {
    			console.log("Response", response);
    			res.send(response);
    		})
    		.catch(error => {
    			console.log("ERROR:", error);
    			res.send(error);
    		})
})

router.post("/delete_secret", (req,res) => {
    delete_secret(url+"/venus/secret/delete_secret", req.body, req.headers)
    		.then(response => {
    			console.log("Response", response);
    			res.send(response);
    		})
    		.catch(error => {
    			console.log("ERROR:", error);
    			res.send(error);
    		})
})


export default router;