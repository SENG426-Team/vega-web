import SimplePageLayout from '../templates/SimplePageLayout.js';
import {fetchuser, enableAccount, changeAccountRole} from  '../../service/AdminPanel/AdminPanel.js';
import {UserContext} from '../../auth/UserProvider.js';
import {useState, useContext, useEffect} from 'react';

import {Form, Button, Row, Col, Table} from 'react-bootstrap';

const AdminPanel = (props) => {
	const {user} = useContext(UserContext);
	const [listOfUsers, setUsers] = useState([]);
	useEffect(() => {
			console.log("Inside useEffect")
			fetchuser(user.jwt)
				.then(resp => {
					setUsers(resp)
					});
		

	}, [user]);

	const enableUser = (username) => {
		console.log("Enable User called with",username)
		const user_data = {
			"username": username, 
		};

		enableAccount(user_data, user.jwt)
		.then(resp => 
			console.log("User enabled"))
	}


	const changeRole = (evt, username) => {
		if(username === "admin@venus.com"){
			alert("Admin user is not permitted to change its own role.")
			evt.target.value = "Default"
		}else if (evt.target.value == "Default"){
			console.log("Assigning Default cannot remove role.")
		}else {
			console.log(evt.target.value, username)
			const role_data = {
				"username": username,
				"new_role": evt.target.value
			};
			changeAccountRole(role_data, user.jwt)
			.then(resp => 
				console.log("Changed Roles"))
		}
	}

	const listOfUsersHTML = () => {
		if(listOfUsers.length){
			return listOfUsers.map((user) => <tr><td>{user.firstName}</td><td>{user.lastName}</td><td>{user.username}</td><td onClick={() => enableUser(user.username)}>
				<a href="#">Enable User</a></td>
				<td>
					<Form.Select aria-label="Floating label select example" onChange={(evt) => changeRole(evt, user.username)}>
					    <option value="Default">Open this select menu</option>
					    <option value="ROLE_STAFF">STAFF</option>
					    <option value="ROLE_USER">USER</option>
  					</Form.Select>
				</td></tr>) 
		}
	}

	return(
		<SimplePageLayout>
			<Table>
				<thead>
					<tr>
						<td>First Name</td>
						<td>Last Name</td>
						<td>Username</td>
						<td></td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{listOfUsersHTML()}
				</tbody>
			</Table>
		</SimplePageLayout>
		)
}
export default AdminPanel;
