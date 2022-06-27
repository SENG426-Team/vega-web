import {useState, useContext} from 'react';

import {useHistory} from "react-router-dom";
import {Button, Row, Col} from 'react-bootstrap';
import SimplePageLayout from '../templates/SimplePageLayout.js';
import UploadFile from '../UI/molecules/UploadFile.js'
import {secretHandler} from '../../service/SecretHandler/SecretHandler.js';
import {UserContext} from '../../auth/UserProvider.js';


const VegaVault = (props) => {
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
	const {user, setUserInfo} = useContext(UserContext);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
		/*  The conversion from File to Base64 was found using the below citation:
			https://pqina.nl/blog/convert-a-file-to-a-base64-string-with-javascript/
		*/
		const reader = new FileReader();
		reader.readAsDataURL(selectedFile);

		reader.onloadend = () => {
			const base64String = reader.result
				.replace('data:', '')
				.replace(/^.+,/, '');

			const today = new Date();
			const date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+(today.getDay());
			const data = {"secret_id": 0, "username": user.username, "date_created": date, "secret": base64String};

			secretHandler(data)
			.then(res => {
				console.log("Response", res);
			})
		};
	}

	return (
		<SimplePageLayout>
			<UploadFile title={"Add Secret"} 
						changeHandler={changeHandler}
						handleSubmission={handleSubmission}>
			</UploadFile>
		</SimplePageLayout>
		);
}
export default VegaVault;