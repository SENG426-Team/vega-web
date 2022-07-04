import bodyParser from 'body-parser';
import express from 'express';
import {create_account} from '../services/AccountAPI.js';
import fileUpload from 'express-fileupload';
import { config } from 'dotenv';

const env = config();
const url = process.env.BACKEND_URL;

let router = express();

router.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

router.post("/create", (req,res) => {
    create_account(url+"/venus/register", req.body, req.headers)
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