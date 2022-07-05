import {useState, useContext} from 'react';
import {UserContext} from '../../auth/UserProvider.js';
import  { Redirect } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap';
import SimplePageLayout from '../templates/SimplePageLayout.js';
import {createAccount} from '../../service/AccountHandler/AccountHandler.js';

const RegisterAccount = (props) => {

	const { context } = props;
	const [username, setUsername]  = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstname]  = useState("");
	const [lastname, setLastname] = useState("");
	const [errorMSG, setErrorMSG] = useState("");
	const [successMSG, setSuccessMSG] = useState("");
	
	const handleSubmission = () => {
		if (username == "" || firstname == "" || lastname == "" || password == "") {
			console.log("Input Error");
			setErrorMSG("Registration Error: An Input Field Was Left Empty");
		} else {
			const registration_data = {
								"username": username,
								"firstname": firstname,
								"lastname": lastname,
								"password": password
								};

			createAccount(registration_data)
			.then(resp => {
				if(resp.code == 401){
					console.log("Registration Error");
					setErrorMSG("Registration Error: Username is not available.");
					setSuccessMSG("")
				} else {
					console.log("Response", resp);
					setErrorMSG("");
					setSuccessMSG("Account Registered. Note, Admin Must Enable The Account.")
				}
			})
		}
	}

			return (
				<SimplePageLayout>
				<h4>Register Account</h4>
				<Row>
					<Col className="mx-auto" xs={6}>
						<Form.Group controlId="formfirstname" className="mb-3">
							<Form.Label>FIRST NAME</Form.Label>
							<Form.Control type="firstname" required={true} onChange={e => setFirstname(e.target.value)} />
						</Form.Group>
						<Form.Group controlId="formlastname" className="mb-3">
							<Form.Label>LAST NAME</Form.Label>
							<Form.Control type="lastname" required={true} onChange={e => setLastname(e.target.value)} />
						</Form.Group>
						<Form.Group controlId="formUsername" className="mb-3">
							<Form.Label>USERNAME</Form.Label>
							<Form.Control type="username" required={true} onChange={e => setUsername(e.target.value)} />
						</Form.Group>
						<Form.Group controlId="formPassword" className="mb-3">
							<Form.Label>PASSWORD</Form.Label>
							<Form.Control type="password" required={true} onChange={e => setPassword(e.target.value)} />
						</Form.Group>
						<Button variant="primary" type="submit" onClick={handleSubmission}>
							Submit
						</Button>
						<br/>
						<p class="text-danger">{errorMSG}</p>
						<p class="text-success">{successMSG}</p>
					</Col>
				</Row>
				</SimplePageLayout>
			);
		}

export default RegisterAccount;
