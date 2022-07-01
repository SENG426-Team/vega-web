import {useState, useContext, useEffect} from 'react';
import AES from 'crypto-js/aes'
import {useHistory} from "react-router-dom";
import {Button, Row, Col, Table} from 'react-bootstrap';
import SimplePageLayout from '../templates/SimplePageLayout.js';
import UploadFile from '../UI/molecules/UploadFile.js'
import {secretHandler, fetchSecrets} from '../../service/SecretHandler/SecretHandler.js';
import {UserContext} from '../../auth/UserProvider.js';


const VegaVault = (props) => {
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [listOfSecrets, setSecrets] = useState([]);
	const {user, setUserInfo} = useContext(UserContext);

	useEffect(() => {
		console.log("Inside useEffect")
		var data = {username: user.username};
		fetchSecrets(data)
			.then(resp => {
				setSecrets(resp)
				});
	}, [user]);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
		/*  The basic encryption can be found here:
			https://tutorialzine.com/2013/11/javascript-file-encrypter
		*/
		/*  The conversion from File to Base64 was found using the below citation:
			https://pqina.nl/blog/convert-a-file-to-a-base64-string-with-javascript/
		*/
		const reader = new FileReader();
		reader.readAsDataURL(selectedFile);

		reader.onloadend = () => {
			const encrypted = AES.encrypt(reader.result, "encryptioncode");
			const file_name = selectedFile.name;
			const today = new Date();
			const date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+(today.getDay());
			const secret_data = {
								"username": user.username, 
								"date_created": date,
								"file_name": file_name,
								"enc": encrypted.ciphertext
								};

			secretHandler(secret_data)
			.then(res => {
				console.log("Response", res);
			})
		};
	}

	const listOfSecretsHTML = () => {
		if(listOfSecrets.length > 0){
			return listOfSecrets.map((secret) => <tr><td>{secret.username}</td><td>{secret.file_name}</td><td>{secret.date_created}</td></tr>) 
		}
	}

	return (
		<SimplePageLayout>
			<UploadFile title={"Add Secret"} 
						changeHandler={changeHandler}
						handleSubmission={handleSubmission}>
			</UploadFile>
			{listOfSecrets.length > 0 &&
			<div>
				<h4>Your Secrets</h4>
				<Table>
					<thead>
						<tr>
							<td>Owner</td>
							<td>Secret Name</td>
							<td>Date Created</td>
						</tr>
					</thead>
					<tbody>
						{listOfSecretsHTML()}
					</tbody>
				</Table>
			</div>
			}
		</SimplePageLayout>
		);
}
export default VegaVault; 