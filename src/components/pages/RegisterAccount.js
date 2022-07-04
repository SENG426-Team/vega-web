import {useState, useContext} from 'react';
import {UserContext} from '../../auth/UserProvider.js';
import  { Redirect } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap';
import SimplePageLayout from '../templates/SimplePageLayout.js';
import {createAccount} from '../../service/AccountHandler/AccountHandler.js';

const RegisterAccount = (props) => {

	const { context } = props;
	const {user, setUserInfo,logout} = useContext(UserContext);
	const [username, setUsername]  = useState('');
	const [password, setPassword] = useState('');
	const [firstname, setFirstname]  = useState('');
	const [lastname, setLastname] = useState('');
	const [auth, setAuth] = useState(false);
	
	const handleSubmission = () => {
		const registration_data = {
							"username": username,
							"firstname": firstname,
							"lastname": lastname,
							"password": password
							};

		createAccount(registration_data)
		.then(resp => {
			console.log("Response", resp);
		})
	}

			return (
				<SimplePageLayout>
				<h4>Register Account</h4>
				<Row>
					<Col className="mx-auto" xs={6}>
						<Form.Group controlId="formUsername" className="mb-3">
							<Form.Label>Username</Form.Label>
							<Form.Control type="username" required={true} onChange={e => setUsername(e.target.value)} />
						</Form.Group>
						<Form.Group controlId="formfirstname" className="mb-3">
							<Form.Label>First Name</Form.Label>
							<Form.Control type="firstname" required={true} onChange={e => setFirstname(e.target.value)} />
						</Form.Group>
						<Form.Group controlId="formlastname" className="mb-3">
							<Form.Label>Last Name</Form.Label>
							<Form.Control type="lastname" required={true} onChange={e => setLastname(e.target.value)} />
						</Form.Group>
						<Form.Group controlId="formPassword" className="mb-3">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" required={true} onChange={e => setPassword(e.target.value)} />
						</Form.Group>
						<Button variant="primary" type="submit" onClick={handleSubmission}>
							Submit
						</Button>
					</Col>
				</Row>
				</SimplePageLayout>
			);
		}

export default RegisterAccount;
