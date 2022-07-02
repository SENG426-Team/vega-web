import bodyParser from 'body-parser';
import express from 'express';
import {fetchusers, enableAccount, changeRole} from '../services/AdminPanelAPI.js';
import fileUpload from 'express-fileupload';
import { config } from 'dotenv';

const env = config();
const url = process.env.BACKEND_URL;

let router = express();

//router.use(bodyParser.json({'limit':'20mb'}));

router.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

router.get("/getusers", (req, res) => {
	console.log("Entered list files");
	fetchusers(url+"/venus/admin/fetchusers", req.headers)
	.then(response => {
    	console.log("Response", response);
    	res.send(response);
    })
    .catch(error => {
    	console.log("ERROR:", error);
    	res.send(error);
    })
})

router.get("/enableuser", (req, res) => {
	console.log("Request: Enable User");
	const {username} = req.query;
	const {enable} = req.query;
	enableAccount(`${url}/venus/admin/enableuser?username=${username}&enable=${enable}`, req.headers)
	.then(response => {
    	console.log("Response", response);
    	res.send(response);
    })
    .catch(error => {
    	console.log("ERROR:", error);
    	res.send(error);
    })
})

router.get("/changerole", (req, res) => {
	console.log("Request: Change Role")
	const {username} = req.query;
	const {role} = req.query;
	changeRole(`${url}/venus/admin/changerole?username=${username}&role=${role}`, req.headers)
	.then(response => {
		console.log("Response", response);
		res.send(response);
	})
	.catch(error => {
		console.log("ERROR:", error);
		res.send(error)
	})
})

router.post("/adduser", (req, res) => {
	console.log("Request: Add User")
	const {username} = req.query;
	const {role} = req.query;
	addUser(`${url}/venus/admin/adduser?username=${username}&role=${role}`, req.headers)
		.then(response => {
			console.log("response", response);
			res.send(response);
		})
		.catch(error => {
			console.log("ERROR:", error);
			res.send(error)
		})

}

export default router;