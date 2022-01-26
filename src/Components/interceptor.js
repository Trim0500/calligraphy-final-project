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
          jwtToken: localStorage.getItem("jwtToken"),
          refreshToken: localStorage.getItem("refreshToken")
        })
      })
         //CHECK IF RESPONSE IS 200
         .then(response => {
           if (response.status === 200) {
             return response.json();
           }
           else {
             localStorage.removeItem("jwtToken");
             localStorage.removeItem("refreshToken");
             window.location.href = "/admin/login";
           }
         })
         .then(data => {
             error.config.headers["Authorization"] = `Bearer ${data.jwtToken}`;
           localStorage.setItem("jwtToken", data.jwtToken);
           localStorage.setItem("refreshToken", data.refreshToken);
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
    if (localStorage.getItem("jwtToken")) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

