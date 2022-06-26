import bodyParser from 'body-parser';
import express from 'express';
import {add_secret} from '../services/SecretHandlerAPI.js';
import fileUpload from 'express-fileupload';
import { config } from 'dotenv';

const env = config();
const url = process.env.BACKEND_URL;

let router = express();

router.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

router.post("/add_secret", (req,res) => {
    add_secret(url+"/venus/admin/add_secret", req.body, req.headers)
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