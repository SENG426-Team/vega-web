import UserRegistrationPageLayout from '../templates/UserRegistrationPageLayout.js';
import UserRegistrationForm from '../UI/organisms/UserRegistrationForm.js';
import LoginUser from '../UI/organisms/LoginUser.js';
import {login} from '../../service/auth/AuthenticationManager.js';
import {useState, useContext} from 'react';
import {UserContext} from '../../auth/UserProvider.js';
import  { Redirect } from 'react-router-dom'

const UserRegistration = (props) => {

	const { context } = props;
	const {user, setUserInfo,logout} = useContext(UserContext);
	const [auth, setAuth] = useState(false);
	console.log("Userinfo", user);


	function onSubmit(userInfo){
		login(userInfo)
			.then(res => {
				console.log("Response", res);
				console.log(res.jwt);
				var role = res.authorities[0].authority;
				setUserInfo(userInfo.username, res.jwt, role)
				setAuth(true);
			})
	}

	if(auth){
		// User is already logged in, so they don't need to register
		return (
			<UserRegistrationPageLayout>
			<LoginUser onSubmit={onSubmit}/>
		</UserRegistrationPageLayout>
	);
	} else {
		//TODO
		// register the user

		return (
			< UserRegistrationPageLayout >
			< UserRegistrationForm onSubmit={onSubmit}/ >
			< /UserRegistrationPageLayout>
	);
	}
}
export default UserRegistration;