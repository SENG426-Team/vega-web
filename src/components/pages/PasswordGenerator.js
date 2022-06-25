import {useState, useContext, useEffect} from 'react';
import SimplePageLayout from '../templates/SimplePageLayout.js';
import {Form, Button, Row, Col, Checkbox, Modal} from 'react-bootstrap';
import {UserContext} from '../../auth/UserProvider.js';

const PasswordGenerator = (props) => {

	const {user} = useContext(UserContext);

    const [usePattern, setUsePattern] = useState(false);
    const [generatedSamplePass, setSamplePass] = useState([]);
    const [generatedPass, setGeneratedPass] = useState("");

    const [currentStrength, setCurrentStrength] = useState(2);

    //Checkbox sets
    const [useUpper, setUseUpper] = useState(true);
    const [useLower, setUseLower] = useState(true);
    const [useDigits, setUseDigits] = useState(true);
    const [useMinus, setUseMinus] = useState(false);
    const [useUnderline, setUseUnderline] = useState(false);
    const [useSpecial, setUseSpecial] = useState(false);
    const [useBrackets, setUseBrackets] = useState(false);

    const [passLength, setPassLength] = useState(16);

    //Modal
    const [showPassStrengthCheck, setShowPassStrengthCheck] = useState(false);
    const [showGenPass, setShowGenPass] = useState(false);
    const [showPrePass, setPreGenPass] = useState(false);

    //Modal Handlers
    const handleShowPassStrengthCheck = (e) => {
        e.preventDefault();
        setShowPassStrengthCheck(true);
    }
    const handleShowGenPass = (e) => {
        e.preventDefault();
        generateSecurePassword();
        setShowGenPass(true);
    }
    const handlePrePass = (e) => {
        e.preventDefault();
        generatePreviewPasses();
        setPreGenPass(true);
    }
    const closeShowPassStrengthCheck = (e) => setShowPassStrengthCheck(false);
    const closeShowGenPass = (e) => setShowGenPass(false);
    const closePrePass = (e) => setPreGenPass(false);

    const whichPattern = (e) => {
        if(e.target.value == 0){
            setUsePattern(false);
        }
        else{
            setUsePattern(true);
        }
    }

    const generateSecurePassword = (e) => {
        let uppers = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

        if(!usePattern){
            //using character set
        }
        else{
            //using pattern
        }
        setGeneratedPass("testpassword");
    }

    const generatePreviewPasses = (e) => {
        setSamplePass(['test1', 'test2', 'test3']);
    }

    const listPasswords = (e) =>{
        if(generatedSamplePass){
            const passList = generatedSamplePass.map((password, index) =>
                    <li key={index} >
                        {password}
                    </li>
                        )
        return (<ul> {passList} </ul>);
        }

    }

	useEffect(() => {
		console.log("JWT is",user.jwt)
			console.log("Inside useEffect")
	}, [user])

    useEffect(() =>{

    }, [passLength])

	return (
		<SimplePageLayout>
        <Form>
            <Form.Group className="mb-3" controlId="radioField">
                <Form.Check type="radio" label="Generate using character set" defaultChecked={true} name="test" onChange={whichPattern} value={0}/>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Range defaultValue={20} disabled={usePattern} onChange={(e) => setPassLength(e.target.value)}/> {passLength}
                    <Form.Check type="checkbox" label="Upper-Case (A, B, C, ...)" defaultChecked={true} disabled={usePattern} onClick={() => setUseUpper(!useUpper)}/>
                    <Form.Check type="checkbox" label="Lower-Case (a, b, c, ...)" defaultChecked={true} disabled={usePattern} onClick={() => setUseLower(!useLower)}/>
                    <Form.Check type="checkbox" label="Digits (1, 2, 3, ...)" defaultChecked={true} disabled={usePattern} onClick={() => setUseDigits(!useDigits)}/>
                    <Form.Check type="checkbox" label="Minus (-)" disabled={usePattern} onClick={() => setUseMinus(!useMinus)}/>
                    <Form.Check type="checkbox" label="Underline (_)" disabled={usePattern} onClick={() => setUseUnderline(!useUnderline)}/>
                    <Form.Check type="checkbox" label="Special (!, @, #, $, ...)" disabled={usePattern} onClick={() => setUseSpecial(!useSpecial)}/>
                    <Form.Check type="checkbox" label="Brackets ([,],(,),{,},<, >)" disabled={usePattern} onClick={() => setUseBrackets(!useBrackets)}/>
                </Form.Group>
                <Form.Check type="radio" label="Generate using pattern" name="test" onChange={whichPattern} value={1}/>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Control disabled={!usePattern} />
                </Form.Group>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleShowGenPass}>
                Generate Secure Password
            </Button>
            <Button variant="primary" type="submit" onClick={handlePrePass}>
                Preview Secure Passwords
            </Button>
        </Form>
        <Form>
        <Button variant="primary" type="submit" onClick={handleShowPassStrengthCheck}>
            Test Password Strength
        </Button>
        </Form>

        <Modal show={showPassStrengthCheck} onHide={closeShowPassStrengthCheck}>
          <Modal.Header closeButton>
            <Modal.Title>Check Password Strength</Modal.Title>
          </Modal.Header>
          <Modal.Body>Password Strength: {currentStrength}</Modal.Body>
          <Form>
          <Form.Control/>
          </Form>
          <Modal.Footer>
            <Button variant="primary">
              Check Strength
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showGenPass} onHide={closeShowGenPass}>
          <Modal.Header closeButton>
            <Modal.Title>Generated Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>{generatedPass}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={closeShowGenPass}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showPrePass} onHide={closePrePass}>
          <Modal.Header closeButton>
            <Modal.Title>Preview Passwords</Modal.Title>
          </Modal.Header>
          <Modal.Body>{listPasswords()}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={closePrePass}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
		</SimplePageLayout>
		);
}

export default PasswordGenerator;
