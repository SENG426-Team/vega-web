import {useContext} from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {UserContext} from '../../../auth/UserProvider.js';

const VenusNavBar = (props) => {
  const {user} = useContext(UserContext);
	var logout;
  var vegavault;
  var resources;
  var adminpanel;
  var passwordGen;
  var register;

  if(user.username && user.jwt){
    console.log(user);
    logout = <Nav.Link href="/account">Logout</Nav.Link>;
    passwordGen = <Nav.Link href="/passwordgenerator">Secure Password Generator</Nav.Link>;
  } else{
    logout = <Nav.Link href="/login">Login/SignUp</Nav.Link>;
  }

  if(user.role == "ROLE_STAFF" || user.role == "ROLE_ADMIN"){
    resources = <Nav.Link href="/resources">Resources</Nav.Link>;
  }

  if (user.jwt && user.role == "ROLE_USER"){
    vegavault = <Nav.Link href="/vegavault">Vega Vault</Nav.Link>;
  }

  if(user.role == "ROLE_ADMIN"){
    adminpanel = <Nav.Link href="/adminpanel">Admin</Nav.Link>
  }

  if(user.username == "") {
    register = <Nav.Link href="/registeraccount">Register</Nav.Link>
  }

  return (
		<Navbar bg="light" variant="light">
    		<Container>
    			<Nav className="w-100 ">
                <Nav.Link href="/platform">Platform</Nav.Link>
        				<Nav.Link href="/news">News & Events</Nav.Link>
        				<Nav.Link href="/leadership">Leadership</Nav.Link>
        				{resources}
        				<Nav.Link href="/aboutus">About us</Nav.Link>
        				<Nav.Link href="/contactus">Contact us</Nav.Link>
                {vegavault}
                {passwordGen}
                {register}
              <Nav.Item className="float-right">
                {logout}
              </Nav.Item>
                {adminpanel}
    			</Nav>
    		</Container>
  		</Navbar>
		);
}
export default VenusNavBar;
