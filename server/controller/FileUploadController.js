import bodyParser from 'body-parser';
import express from 'express';
import {uploader, listFiles, fetchcontent} from '../services/FileHandlerAPI.js';
import fileUpload from 'express-fileupload';
import { config } from 'dotenv';

const env = config();
const url = process.env.BACKEND_URL;

let router = express();

//router.use(bodyParser.json({'limit':'20mb'}));

router.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));


router.post("/upload", (req,res) => {
	var formData = req.files;
    console.log("Entered into File uploader", formData)
    uploader(url+"/venus/admin/handlefileupload", formData, req.headers)
    		.then(response => {
    			console.log("Response", response);
    			res.send(response);
    		})
    		.catch(error => {
    			console.log("ERROR:", error);
    			res.send("An error has occured");
    		})
})

router.get("/listfiles", (req, res) => {
	console.log("Entered list files");
	listFiles(url+"/venus/files/listfiles", req.headers)
	.then(response => {
    	console.log("Response", response);
    	res.send(response);
    })
    .catch(error => {
    	console.log("ERROR:", error);
    	res.send("An error has occured");
    })
})

router.get("/fetchcontent", (req, res) => {
	console.log("Fetch Content")
	const {name} = req.query
	console.log(name)
	fetchcontent(url+"/venus/files/fetch/"+name, req.headers)
	.then(response => {
    	console.log("Response", response);
    	res.send(response);
    })
    .catch(error => {
    	console.log("ERROR:", error);
    	res.send("An error has occured");
    })

})

export default router;
