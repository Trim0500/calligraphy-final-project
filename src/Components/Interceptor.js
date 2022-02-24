import axios from 'axios';
import Cookies from 'js-cookie';

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401 || error.response.status === 403) {
            let api = process.env.NODE_ENV === 'development' ? "https://localhost:5001/api/admin/refresh" : process.env.REACT_APP_BACKEND_URL + "/api/admin/refresh"
            fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    JwtToken: localStorage.getItem("isLoggedIn"),
                })
            })
                //CHECK IF RESPONSE IS 200
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    else {
                        localStorage.removeItem("isLoggedIn");
                        window.location.href = "/admin/login";
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
        return Promise.reject(error);
    }
);

let xsrfToken = Cookies.get('XSRF-TOKEN');
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-XSRF-TOKEN'] = xsrfToken;

// if the return is 400 then call the function again
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 400) {
            return axios(error.response.config);
        }
        return Promise.reject(error);
    }
);


