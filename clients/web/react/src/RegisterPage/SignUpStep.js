import React, { useState, useEffect, useContext } from 'react';
import { Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { WebAuthnClient } from '../_components';
import { userActions, credentialActions, alertActions } from '../_actions';

import validate from 'validate.js';


const SignUpStep = ({ setForm, formData, navigation }) => {

  const dispatch = useDispatch();

  const { username, pin, nickname, credential } = formData;

  const [errors, setErrors] = useState({
    username: ''
  });
  const [validated, setValidated] = useState(false);

  const constraints = {
    username: {
      presence: true,
      format: {
        pattern: "[a-z0-9_\-]+",
        flags: "i",
        message: "can only contain a-z, 0-9, or _-"
      },
      length: {
        minimum: 3,
        maximum: 20
      }
    }
  };

  const LogInStep = () => {
    history.push('/login');
  }

  async function register() {
    console.log("register");
    
    try {
      let options = ""; // default = no platform or cross-platform preference
      let userData = await WebAuthnClient.signUp(username, options, uv);
      console.log("SignUpStep register userData: ", userData);

      if (userData === undefined) {
        console.error("SignUpStep register error: userData undefined");
        dispatch(alertActions.error("Something went wrong. Please try again."));
      } else {
        dispatch(alertActions.success('Registration successful'));
        setForm({target: {name: "credential", value: userData.credential}});
        registerKeySuccessStep(userData.credential);
      }
      
    } catch (err) {
      console.error("SignUpStep register error");
      console.error(err);
      dispatch(alertActions.error(err.message));
    }
  }

  function uv() {
    //This is a user verifying platform. Skipping UV check.
  }

  const registerKeySuccessStep = (credential) => {
    localStorage.setItem('credential', JSON.stringify(credential));
    console.log('registerKeySuccessStep credential ', credential);
    window.location.reload();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(e);

    const result = validate({ username: value }, constraints);
    if (result) {
      setErrors(errors => ({ ...errors, [name]: result.username.join(". ") }));
      setValidated(false);
      return;
    } else {
      setErrors(errors => ({ ...errors, [name]: undefined }));
      setValidated(true);
    }
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();

        setValidated(true);

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        if(isUsernameValid()) {
          register();
        }
  }

  const isUsernameValid = () => {
    if(validate({ username: username }, constraints)){
        return false;
    }
    return true;
}

  return (
    <>
        <center>
          <h2>Welcome</h2>
          <label>Sign up to the WebAuthn Starter Kit to continue</label>
        </center>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group >
            <InputGroup mb="3" hasValidation>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="username"
                placeholder="Username"
                aria-label="Username"
                defaultValue={username}
                aria-describedby="basic-addon1"
                onChange={handleChange}
                isInvalid={!isUsernameValid()}
                isValid={isUsernameValid()}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <center>
            <h4>Add Your Security Key</h4>
            <label>Security keys are the primary authentication factor</label>
          </center>
          <ol>
            <li>Make sure your Security Key is nearby</li>
            <li>Follow the steps in the browser</li>
            <li>Give your Security Key a nickname to easily identify it later</li>
          </ol>
          <Button type="submit" variant="primary btn-block mt-3">Continue</Button>
        </Form>
        <div className="mt-5">
          <hr></hr>
        </div>
        <div>
          <center>Already have an account? <span onClick={LogInStep} className="btn-link">Log In</span></center>
        </div>
    </>
  );
};

export default SignUpStep;