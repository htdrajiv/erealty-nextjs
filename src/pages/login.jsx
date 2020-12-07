import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import ReduxConstants from '../redux/ReduxConstants.jsx'
import { Form, Button } from 'react-bootstrap';
import { providers, signIn } from 'next-auth/client'

const emailRegex = new RegExp("^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$");
const passwordRegex = new RegExp();

function Login({ providers }) {
    const router = useRouter();
    const [state, setState] = useState({
        rememberMe: false,
        validated: false,
        userNameValidationMessage: "Please enter valid username",
        passwordValidationMessage: "Please enter valid password",
        userName: "",
        password: ""
    })

    let toggleRememberMe = (event) => {
        setState({
            ...state,
            rememberMe: event.target.checked
        })
    }

    let createLoginDispatchResponse = (userObj) => {
        return {
            type: ReduxConstants.LOGIN,
            authProvider: ReduxConstants.AUTH_PROVIDER_GOOGLE,
            userId: userObj.email,
            userName: userObj.name,
            image: userObj.imageUrl
        };
    }

    let handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        localStorage.userName = state.userName;
        localStorage.password = state.password;
        localStorage.rememberMe = state.rememberMe;
        setState({
            ...state,
            validated: true
        })
    };

    let handleAuthChange = (event) => {
        let regexChecker = event.target.type === "userName" ? emailRegex : passwordRegex;
        if (!regexChecker.test(event.target.value)) {
            setState({
                ...state,
                [event.target.name + "ValidationMessage"]: "Please enter a valid value.",
                [event.target.name]: event.target.value
            })
        } else {
            setState({
                ...state,
                [event.target.name]: event.target.value
            })
        }
    }

    const { userNameValidationMessage, passwordValidationMessage, validated, userName, password } = state;

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <span>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <h3>Sign In</h3>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={handleAuthChange}
                                required
                                value={userName || ""}
                                name="userName"
                            />
                            <Form.Control.Feedback type="invalid">
                                {userNameValidationMessage}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                onChange={handleAuthChange}
                                value={password || ""}
                                name="password"
                            />
                            <Form.Control.Feedback type="invalid">
                                {passwordValidationMessage}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check onChange={toggleRememberMe} type="checkbox" label="Remember Me" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <p className="forgot-password text-right">
                            <a href="#">Forgot Password?</a>
                        </p>
                        <p className="forgot-password text-right">
                            Not Registered Yet?
                            {/* <NavLink className="" to="/signUp">

                            </NavLink> */}
                            <Link href="/signUp">
                                <a><span className="glyphicon glyphicon-user"></span>Sign Up</a>
                            </Link>
                        </p>
                    </Form>
                    {Object.values(providers).map(provider => (
                        <p key={provider.name}>
                            <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
                        </p>
                    ))}
                </span>
            </div>
        </div>
    );
}

Login.getInitialProps = async (context) => {
    return {
        providers: await providers(context)
    }
}

export default Login;
