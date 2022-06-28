import {Form, Button, Row, Col} from 'react-bootstrap';
const UserRegistrationForm = (props) => {
	return (
		<Row>
      <Col className="mx-auto" xs={6}>
        <Form>
      			<Form.Group className="mb-3">
        			<Form.Label>NAME</Form.Label>
        			<Form.Control type="name" required="true"/>
      			</Form.Group>
      			<Form.Group className="mb-3">
        			<Form.Label>EMAIL</Form.Label>
        			<Form.Control type="email" required="true"/>
      			</Form.Group>
      			<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        			<Form.Label>MESSAGE</Form.Label>
        			<Form.Control as="textarea" rows={3} required="true"/>
      			</Form.Group>
      			<Button variant="primary" type="submit">
        			Submit
      			</Button>
    		</Form>
      </Col>
    </Row>
		);
}
export default UserRegistrationForm;