import React from 'react';
import Link from 'next/link'
import { Form, Button } from 'react-bootstrap';

export default function SignUp(props) {
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <span>
                    <form>
                        <h3>Sign Up</h3>

                        <div className="form-group">
                            <label>First name</label>
                            <input type="text" className="required form-control" placeholder="First name" />
                        </div>

                        <div className="form-group">
                            <label>Last name</label>
                            <input type="text" className="form-control" placeholder="Last name" />
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <Button type="submit" variant="info" className="btn btn-primary btn-block">Sign Up</Button>
                        <p className="forgot-password text-right">
                            Already registered?
                            <Link href="/auth/login">
                                <a><span className="glyphicon glyphicon-user"></span>Login</a>
                            </Link>
                        </p>
                    </form>
                </span>
            </div>
        </div>
    );
}