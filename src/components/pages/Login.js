import {useState, useContext} from 'react';
import UserRegistrationPageLayout from '../templates/UserRegistrationPageLayout.js';
import LoginUser from '../UI/organisms/LoginUser.js';
import {login} from '../../service/auth/AuthenticationManager.js';

import {UserContext} from '../../auth/UserProvider.js';
import  { Redirect } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap';

const Login = (props) => {

	const { context } = props;
	const {user, setUserInfo,logout} = useContext(UserContext);
	const [auth, setAuth] = useState(false);
	const [errorMSG, setErrorMSG] = useState("");
	console.log("Userinfo", user);
	function onSubmit(userInfo){
		login(userInfo)
			.then(res => {
				console.log(res.code)
				if(res.code == 401){
					console.log("Authentication Error");
					setErrorMSG("Authentication Error: Username and/or Password is Incorrect");
				}
				else if (res.code == "ECONNREFUSED"){
					console.log("Cannot Reach Backend Server");
					setErrorMSG("Authentication Service Temporarily Unavailable");
				}
				else{
					setErrorMSG("");
					console.log("Response", res);
					console.log(res.jwt);
					var role = res.authorities[0].authority;
					setUserInfo(userInfo.username, res.jwt, role)
					setAuth(true);
				}
			})
	}

		if(!auth){
			return (
				<UserRegistrationPageLayout>
					<LoginUser onSubmit={onSubmit}/>
					<Col className="mx-auto" xs={6}>
						<p class="text-danger">{errorMSG}</p>

					</Col>
				</UserRegistrationPageLayout>
			);
		} else {
			return <Redirect to='/' />;
		}
}

export default Login;
