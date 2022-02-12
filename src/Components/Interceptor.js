import axios from 'axios';

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401 || error.response.status === 403) {
     fetch("https://localhost:5001/api/admin/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          JwtToken: localStorage.getItem("JwtToken"),
          RefreshToken: localStorage.getItem("RefreshToken")
        })
      })
         //CHECK IF RESPONSE IS 200
         .then(response => {
           if (response.status === 200) {
             return response.json();
           }
           else {
             localStorage.removeItem("JwtToken");
             localStorage.removeItem("RefreshToken");
             window.location.href = "/admin/login";
           }
         })
         .then(data => {
             error.config.headers["Authorization"] = `Bearer ${data.JwtToken}`;
           localStorage.setItem("JwtToken", data.JwtToken);
           localStorage.setItem("RefreshToken", data.RefreshToken);
             return axios(error.config);
         })
      .catch(error => {
        console.log(error);
      });
     }
     return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  config => {
    if (localStorage.getItem("JwtToken")) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem("JwtToken")}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

