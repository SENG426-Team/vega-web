import {useState, useContext, useEffect} from 'react';
import {Form, Button, Row, Col, Table} from 'react-bootstrap';
import SimplePageLayout from '../templates/SimplePageLayout.js';
import {secretHandler, fetchSecrets, deleteSecret, shareSecret, fetchSharedSecrets} from '../../service/SecretHandler/SecretHandler.js';
import {UserContext} from '../../auth/UserProvider.js';

const VegaVault = (props) => {
	const [selectedSecret, setSelectedSecret] = useState("");
	const [listOfSecrets, setSecrets] = useState([]);
	const [listOfSharedSecrets, setSharedSecrets] = useState([]);
	const [usernameShare, setUsernameShare] = useState("");
	const [idShare, setIdShare] = useState();
	const {user, setUserInfo} = useContext(UserContext);

	useEffect(() => {
		console.log("Inside useEffect")
		var data = {username: user.username};
		fetchSecrets(data, user.jwt)
			.then(resp => {
				setSecrets(resp)
				});
		fetchSharedSecrets(data, user.jwt)
			.then(resp => {
				setSharedSecrets(resp)
			});
	}, [user]);

	const deleteSubmission = (secret_id) => {
		var id = {secret_id: secret_id};
		deleteSecret(id, user.jwt)
		.then(resp => {
			console.log("Secret Deleted")
			window.location.reload();
			});
	};

	const listOfSecretsHTML = () => {
		if(listOfSecrets.length > 0){
			return listOfSecrets.map((secret) => <tr>
													 <td>{secret.secret_id}</td>
													 <td>{secret.secret_content}</td>
													 <td>{secret.date_created}</td>
													 <td> <Button onClick={() => deleteSubmission(secret.secret_id)}>Delete</Button>
													 </td>
												</tr>) 
		}
	}

	const listOfSharedSecretsHTML = () => {
		if(listOfSharedSecrets.length > 0){
			return listOfSharedSecrets.map((shared_secret) => <tr>
													 <td>{shared_secret.secret_id}</td>
													 <td>{shared_secret.sender}</td>
													 <td>{shared_secret.temp_content}</td>
													 <td>{shared_secret.date_shared}</td>
												</tr>) 
		}
	}

	const handleSubmission = () => {
		const secret_content = selectedSecret;
		const today = new Date();
		const date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+(today.getDay());
		const secret_data = {
							"username": user.username, 
							"date_created": date,
							"secret_content": secret_content,
							};

		secretHandler(secret_data, user.jwt)
		.then(resp => {
			console.log("Response", resp);
			window.location.reload();
		})
	}

	const handleShareSubmission = () => {
		const today = new Date();
		const date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+(today.getDay());

		const secret_data = {
							"shared_id": 0,
							"secret_id": parseInt(idShare), 
							"sender": user.username,
							"recipient": usernameShare,
							"date_shared": date,
							"temp_content": ""
							};

		shareSecret(secret_data, user.jwt)
		.then(resp => {
			console.log("Response", resp);
		})
	}

	const secretOptions = () => {
		return(
			<div>
				<h4>Your Secrets</h4>
				<Table>
					<thead>
						<tr>
							<td>Identifier</td>
							<td>Secret</td>
							<td>Date Created</td>
						</tr>
					</thead>
					<tbody>
						{listOfSecretsHTML()}
					</tbody>
				</Table>

				<h4>Share With User</h4>
				<Row>
					<Col className="mx-auto" xs={6}>
						<Form.Group controlId="formUsername" className="mb-3">
							<Form.Label>Username</Form.Label>
							<Form.Control type="username" required={true} onChange={e => setUsernameShare(e.target.value)} />
						</Form.Group>
						<Form.Group controlId="formShareID" className="mb-3">
							<Form.Label>Secret ID</Form.Label>
							<Form.Select aria-label="Floating label select example" onChange={e => setIdShare(e.target.value)}>
								<option>ID</option>
								{listOfSecrets.map((secret) => <option>{secret.secret_id}</option>)}
							</Form.Select>
						</Form.Group>
						<Button variant="primary" type="submit" onClick={handleShareSubmission}>
							Submit
						</Button>
					</Col>
				</Row>
			</div>
		)
	}

	const sharedSecretOptions = () => {
		return(
			<div>
				<h4>Secrets Shared With You</h4>
				<Table>
					<thead>
						<tr>
							<td>Identifier</td>
							<td>Secret Owner</td>
							<td>Shared Secret</td>
							<td>Date Shared</td>
						</tr>
					</thead>
					<tbody>
						{listOfSharedSecretsHTML()}
					</tbody>
				</Table>
			</div>
		)
	}

	return (
		<SimplePageLayout>
			<h4>Upload Secret</h4>
			<Row>
				<Col className="mx-auto" xs={6}>
					<Form.Group controlId="formSecret" className="mb-3">
						<Form.Label>Secret</Form.Label>
						<Form.Control type="secret" required={true} onChange={e => setSelectedSecret(e.target.value)} />
					</Form.Group>
					<Button variant="primary" type="submit" onClick={handleSubmission}>
						Create Secret
					</Button>
				</Col>
			</Row>
			{listOfSecrets.length > 0 && secretOptions()}
			{listOfSharedSecrets.length > 0 && sharedSecretOptions()}
		</SimplePageLayout>
		);
}
export default VegaVault; 