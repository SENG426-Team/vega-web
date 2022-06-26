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
		const formData = new FormData();
		var today = new Date();
		var date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+(today.getDay());

		formData.append("secret_id", 0);
		formData.append("username", user.username);
		formData.append("date_created", date);
		formData.append("secret", selectedFile);
		
		secretHandler(formData)
			.then(res => {
				console.log("Response", res);
			})

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