import {Form, Button, Row, Col} from 'react-bootstrap';

const UploadFile = (props) => {	
	
	return (
		<Row>
			<Col className="mx-auto" xs={6}>
				<Form.Group controlId="formFile" className="mb-3">
					<Form.Label>{props.title}</Form.Label>
					<Form.Control type="file" onChange={props.changeHandler} />
				</Form.Group>
				<Button variant="primary" type="submit" onClick={props.handleSubmission}>
					Submit
				</Button>
			</Col>
		</Row>
		);
}

export default UploadFile;