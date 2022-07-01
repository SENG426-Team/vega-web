import bodyParser from 'body-parser';
import express from 'express';
import {add_secret, fetch_secrets} from '../services/SecretHandlerAPI.js';
import fileUpload from 'express-fileupload';
import { config } from 'dotenv';

const env = config();
const url = process.env.BACKEND_URL;

let router = express();

router.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

router.post("/add_secret", (req,res) => {
    add_secret(url+"/venus/secret/add_secret", req.body)
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
    fetch_secrets(url+"/venus/secret/fetch_secrets", req.body)
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