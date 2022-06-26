import {useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Row, Col} from 'react-bootstrap';
import SimplePageLayout from '../templates/SimplePageLayout.js';
import UploadFile from '../UI/molecules/UploadFile.js'
import {fileUploader} from '../../service/FileUpload/FileUploader.js';
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
		formData.append("file", selectedFile);
		fileUploader(formData, user.jwt)
			.then(res => {
				console.log("Response", res);
			})

	}

	return (
		<SimplePageLayout>
			<UploadFile title={"Upload Secret"} 
						changeHandler={changeHandler}
						handleSubmission={handleSubmission}>
			</UploadFile>
		</SimplePageLayout>
		);
}
export default VegaVault;