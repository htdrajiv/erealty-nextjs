import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import ReduxConstants from '../../redux/ReduxConstants.jsx'
import { Form, Button, Col } from 'react-bootstrap';
import { signIn } from 'next-auth/client'
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const emailRegex = new RegExp("^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$");
const passwordRegex = new RegExp();


function LoginWithEmail(props) {
    const { csrfToken } = props;
    return (
        csrfToken &&
        <div>
            <h5> SignIn with Email</h5>
            <Form method='post' action='/api/auth/signin/email'>
                <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Enter Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            id="email"
                            placeholder="abc@xyz.com"
                            required
                            name="email"
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Button variant="info" type="submit">
                            Sign In With Email
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </div>
    )
}

function LoginWithProviders(props) {
    const { providers } = props;
    return (
        <div>
            <h5>SignIn with Providers</h5>
            {
                providers && Object.values(providers).map(provider => (
                    <p key={provider.name}>
                        <Button variant="info" onClick={() => signIn(provider.id)}>Sign in with {provider.name}</Button>
                    </p>
                ))
            }
        </div>
    )
}

function LoginWithCredentials(props) {
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
        <div>
            <h5>SignIn</h5>
            <Form method="POST" action='/api/auth/callback/credentials'>
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
                <Button variant="info" type="submit">
                    Submit
                            </Button>
                <p className="forgot-password text-right">
                    <a href="#">Forgot Password?</a>
                </p>
                <p className="forgot-password text-right">
                    Not Registered Yet?
                            {/* <NavLink className="" to="/signUp">

                            </NavLink> */}
                    <Link href="/auth/signUp">
                        <a><span className="glyphicon glyphicon-user"></span>Sign Up</a>
                    </Link>
                </p>
            </Form>
        </div>
    )
}

const logins = { "CREDENTIALS": "CREDENTIALS", "PROVIDERS": "PROVIDERS", "EMAIL": "EMAIL" }
const nextLogins = {
    [logins.CREDENTIALS]: { next: "EMAIL", previous: "PROVIDERS" },
    [logins.PROVIDERS]: { next: "CREDENTIALS", previous: "EMAIL" },
    [logins.EMAIL]: { next: "PROVIDERS", previous: "CREDENTIALS" }
}

function Login(props) {
    const [loginForm, setLoginForm] = useState(logins.PROVIDERS);
    const { providers, csrfToken } = props;

    let handlePreviousClick = (event) => {
        setLoginForm(nextLogins[loginForm].previous)
    }

    let handleNextClick = (event) => {
        setLoginForm(nextLogins[loginForm].next)
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            Click next or previous arrows to see other options for sign in.
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <Button variant="light" size="lg" style={{ margin: "10rem 0 0 0", borderRadius: "20px", float: "left" }} onClick={handlePreviousClick} >
                                <FontAwesomeIcon icon={faAngleDoubleLeft} />
                            </Button>
                        </div>
                        {loginForm === logins.CREDENTIALS &&
                            <div className="col-8">
                                <LoginWithCredentials />
                            </div>
                        }
                        {loginForm === logins.EMAIL &&
                            <div className="col-8">
                                <LoginWithEmail csrfToken={csrfToken} />
                            </div>
                        }
                        {loginForm === logins.PROVIDERS &&
                            <div className="col-8">
                                <LoginWithProviders providers={providers} />
                            </div>
                        }
                        <div className="col-2">
                            <Button variant="light" size="lg" style={{ margin: "10rem 0 0 0", borderRadius: "20px", float: "right" }} onClick={handleNextClick}>
                                <FontAwesomeIcon icon={faAngleDoubleRight} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Login;
