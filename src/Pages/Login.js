import React from 'react';
import {Image} from "react-bootstrap";
import Logo from '../resources/logo.png';

export  default function Login() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const  handleUserNameChange = (event) => {
        setUsername(event.target.value);
    }

    const  handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {

        let Url = 'https://localhost:5001/api/admin/login';
        event.preventDefault();

        let data = {
            username: username,
            password: password
        }

        fetch( Url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
               return response.json();
            }
        }).then(data => {

            if (data !== undefined) {
                if (data.JwtToken !== null && data.RefreshToken !== null) {
                    localStorage.setItem('JwtToken', data.JwtToken);
                    localStorage.setItem('RefreshToken', data.RefreshToken);
                    window.location.href = '/home';
                }
                else {
                    alert('Invalid username or password');
                }
            }
            else {
                alert('Invalid username or password');
            }

        });
    }

    return(
        // make the login page much nicer
        <div className="container">
            <div className="row d-flex justify-content-center mt-5">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="py-3 px-2">
                        <Image className="offset-3 rounded-circle" src={Logo} width={250}  height={250} />
                        <h1 className="text-center mb-3 mt-2">Sign in for Admin</h1>
                        <div className="division">
                            <div className="row">
                                <div className="col-3">
                                    <div className="line l"/>
                                </div>
                                <div className="col-3">
                                    <div className="line r"/>
                                </div>
                            </div>
                        </div>
                        <form className="myform">
                            <div className="form-group m-1"><input id="username" onChange={handleUserNameChange} type="username"
                                                                   className="form-control w-50 offset-3"
                                                               placeholder="Username"/>
                            </div>
                            <div className="form-group m-1">
                                <input onChange={handlePasswordChange} id="password" type="password"
                                       className="form-control w-50 offset-3"
                                                               placeholder="Password"/>
                            </div>

                            <div className="form-group mt-3 mx-1 text-center">
                                <button onClick={handleSubmit} type="submit" className="btn btn-primary w-50">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}