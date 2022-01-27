import React from 'react';

function Login() {

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
            // if data is undefined, then the user is not authenticated

            if (data !== undefined) {
                alert('Invalid username or password');
                if (data.jwtToken !== null && data.refreshToken !== null) {
                    localStorage.setItem('jwtToken', data.jwtToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    window.location.href = '/';
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
        <div className="container">
            <div className="row d-flex justify-content-center mt-5">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card py-3 px-2">
                        <h1 className="text-center mb-3 mt-2">Login</h1>
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
                            <div className="form-group"><input id="username" onChange={handleUserNameChange} type="username" className="form-control"
                                                               placeholder="Username"/>
                            </div>
                            <div className="form-group">
                                <input onChange={handlePasswordChange} id="password" type="password" className="form-control"
                                                               placeholder="Password"/>
                            </div>

                            <div className="form-group mt-3">
                                <button onClick={handleSubmit} type="submit" className="btn btn-block btn-primary btn-lg"><small><i
                                className="far fa-user pr-2"/>Connect</small></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;