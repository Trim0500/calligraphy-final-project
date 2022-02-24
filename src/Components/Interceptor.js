import axios from 'axios';

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
axios.defaults.withCredentials = true;



