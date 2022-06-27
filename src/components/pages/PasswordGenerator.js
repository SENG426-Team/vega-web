import {useState, useContext, useEffect} from 'react';
import SimplePageLayout from '../templates/SimplePageLayout.js';
import {Form, Button, Row, Col, Checkbox, Modal} from 'react-bootstrap';
import {UserContext} from '../../auth/UserProvider.js';

const PasswordGenerator = (props) => {

	const {user} = useContext(UserContext);

    const [usePattern, setUsePattern] = useState(false);
    const [generatedSamplePass, setSamplePass] = useState([]);
    const [generatedPass, setGeneratedPass] = useState("");
	const [inputedPass, setInputedPass] = useState("");

	const [pattern, setPattern] = useState("");

	const [strength, setStrength] = useState(0);

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
		setStrength("");
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

	const getPassStrenth = (entropyBits) =>{
		if(entropyBits < 35){
			return "Very Weak"
		}
		else if (entropyBits < 80){
			return "Weak"
		}
		else if (entropyBits < 120){
			return "Strong"
		}
		else{
			return "Very Strong"
		}
	}

	const calcPassStrength = () => {

		let uppers = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
		let lowers = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
		let digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
		let special = ["!", "@", "#", "$", "%", "^", "&", "*", "?", "-", "_"];
		let brackets = ["[", "]", "(", ")", "{", "}", "<", ">"];

		let upperPresent = false;
		let lowerPresent = false;
		let digitPresent = false;
		let specialPresent = false;
		let bracketPresent = false;

		let pass = inputedPass;
		for(let i = 0; i < pass.length; i++){
			if(uppers.includes(pass.charAt(i))){
				upperPresent = true;
			}
			else if(lowers.includes(pass.charAt(i))){
				lowerPresent = true;
			}
			else if(digits.includes(pass.charAt(i))){
				digitPresent = true;
			}
			else if(special.includes(pass.charAt(i))){
				specialPresent = true;
			}
			else if(brackets.includes(pass.charAt(i))){
				bracketPresent = true;
			}

		}

		let numCharSet = 0;
		if(upperPresent){
			numCharSet = numCharSet + 26;
		}
		if(lowerPresent){
			numCharSet = numCharSet + 26;
		}
		if(digitPresent){
			numCharSet = numCharSet + 10;
		}
		if(specialPresent){
			numCharSet = numCharSet + 11
		}
		if(bracketPresent){
			numCharSet = numCharSet + 8;
		}

		if(numCharSet == 0){
			setStrength("No Password Given");
		}
		else{
			setStrength(getPassStrenth(Math.log2(numCharSet) * pass.length));
		}

	}

    const generateSecurePassword = (e) => {
        let uppers = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
		let lowers = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
		let digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
		let minus = ["-"];
		let underline = ["_"];
		let special = ["!", "@", "#", "$", "%", "^", "&", "*", "?"];
		let brackets = ["[", "]", "(", ")", "{", "}", "<", ">"];

		let characterSet = [];

		if(!(useUpper || useLower || useDigits || useMinus || useUnderline || useSpecial || useBrackets)){
			characterSet = characterSet.concat(uppers);
			characterSet = characterSet.concat(lowers);
			characterSet = characterSet.concat(digits);
		}

		if(useUpper){
			characterSet = characterSet.concat(uppers);
		}
		if(useLower){
			characterSet = characterSet.concat(lowers);
		}
		if(useDigits){
			characterSet = characterSet.concat(digits);
		}
		if(useMinus){
			characterSet = characterSet.concat(minus);
		}
		if(useUnderline){
			characterSet = characterSet.concat(underline);
		}
		if(useSpecial){
			characterSet = characterSet.concat(special);
		}
		if(useBrackets){
			characterSet = characterSet.concat(brackets);
		}

		let shuffledCharacterSet = characterSet
		  .map(value => ({ value, sort: Math.random() }))
		  .sort((a, b) => a.sort - b.sort)
		  .map(({ value }) => value)


		//using character set
        if(!usePattern){
			setStrength(getPassStrenth(Math.log2(shuffledCharacterSet.length) * passLength));
			let password = ""
			for(let i = 0; i < passLength; i++){
				password = password + shuffledCharacterSet[Math.floor(Math.random() * shuffledCharacterSet.length)]
			}
			setGeneratedPass(password);
			return password;
        }
		//using pattern
        else{
			let new_special = special.concat(minus).concat(underline);
			if(pattern.length <= 0){
				setGeneratedPass("No Pattern Supplied")
				return "No Pattern Supplied";
			}
			let password = "";
			let upperPresent = false;
			let lowerPresent = false;
			let digitPresent = false;
			let specialPresent = false;
			let bracketPresent = false;

			for(let i = 0; i < pattern.length; i++){
				let patternChar = pattern.charAt(i);
				if(patternChar == "A"){
					upperPresent = true
					password = password + uppers[Math.floor(Math.random() * uppers.length)]
				}
				else if(patternChar == "a"){
					lowerPresent = true
					password = password + lowers[Math.floor(Math.random() * lowers.length)]
				}
				else if (patternChar == "s"){
					specialPresent = true
					password = password + new_special[Math.floor(Math.random() * new_special.length)]
				}
				else if (patternChar == "d"){
					digitPresent = true
					password = password + digits[Math.floor(Math.random() * digits.length)]
				}
				else if (patternChar == "b"){
					bracketPresent = true
					password = password + brackets[Math.floor(Math.random() * brackets.length)]
				}
				else{
					setGeneratedPass("Invalid Pattern")
					return "Invalid Pattern"
				}
			}
			let numCharSet = 0;
			if(upperPresent){
				numCharSet = numCharSet + 26;
			}
			if(lowerPresent){
				numCharSet = numCharSet + 26;
			}
			if(digitPresent){
				numCharSet = numCharSet + 10;
			}
			if(specialPresent){
				numCharSet = numCharSet + 11
			}
			if(bracketPresent){
				numCharSet = numCharSet + 8;
			}
			setStrength(getPassStrenth(Math.log2(numCharSet) * password.length))
			setGeneratedPass(password);
			return password
        }


    }

    const generatePreviewPasses = (e) => {
		let samplePasses = [];
		for(let i = 0; i < 10; i++){
			samplePasses.push(generateSecurePassword());
		}
        setSamplePass(samplePasses);
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
	}, [user])

    useEffect(() =>{

    }, [passLength])

	return (
		<SimplePageLayout>
        <Form>
            <Form.Group className="mb-3" controlId="radioField">
                <Form.Check type="radio" label="Generate using character set" defaultChecked={true} name="test" onChange={whichPattern} value={0}/>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Label>Password Length</Form.Label>
					<br/>
                    <Form.Range defaultValue={20} disabled={usePattern} onChange={(e) => setPassLength(e.target.value)} max={45} min={8} style={{width: "50%"}}/> {passLength}
                    <Form.Check type="checkbox" label="Upper-Case (A, B, C, ..., Z)" defaultChecked={true} disabled={usePattern} onClick={() => setUseUpper(!useUpper)}/>
                    <Form.Check type="checkbox" label="Lower-Case (a, b, c, ..., z)" defaultChecked={true} disabled={usePattern} onClick={() => setUseLower(!useLower)}/>
                    <Form.Check type="checkbox" label="Digits (0, 1, 2, ..., 9)" defaultChecked={true} disabled={usePattern} onClick={() => setUseDigits(!useDigits)}/>
                    <Form.Check type="checkbox" label="Minus (-)" disabled={usePattern} onClick={() => setUseMinus(!useMinus)}/>
                    <Form.Check type="checkbox" label="Underline (_)" disabled={usePattern} onClick={() => setUseUnderline(!useUnderline)}/>
                    <Form.Check type="checkbox" label="Special (!, @, #, $, %, ^, &, *, ?)" disabled={usePattern} onClick={() => setUseSpecial(!useSpecial)}/>
                    <Form.Check type="checkbox" label="Brackets ([,],(,),{,},<, >)" disabled={usePattern} onClick={() => setUseBrackets(!useBrackets)}/>
                </Form.Group>
                <Form.Check type="radio" label="Generate using pattern (Valid Chars: a = Lowercase, A = Uppercase, d = Digits, b = Brackets, s = Special)" name="test" onChange={whichPattern} value={1}/>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Control disabled={!usePattern} onChange={(e) => setPattern(e.target.value)} maxLength={45}/>
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
          <Modal.Body>Password Strength: {strength}</Modal.Body>
          <Form>
          <Form.Control onChange={(e) => setInputedPass(e.target.value)} maxLength={50}/>
          </Form>
          <Modal.Footer>
            <Button variant="primary" onClick={calcPassStrength}>
              Check Strength
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showGenPass} onHide={closeShowGenPass}>
          <Modal.Header closeButton>
            <Modal.Title>Generated Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>{generatedPass} <br/> Password Strength: {strength}</Modal.Body>
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
