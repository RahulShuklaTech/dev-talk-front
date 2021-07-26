import axios from "axios";

const getNewToken = async () => {
    const response = await axios.post('/auth/token',{'refreshToken': localStorage.getItem('refreshToken')}) 
    console.log("getnewtoken",response.data.token)
    localStorage.setItem('token',response.data.token)
} 
export default function setupInterceptors(history) {
    console.log("i came here")
    axios.defaults.baseURL = "http://localhost:3300/";

    axios.interceptors.request.use(
        function (req) {
            let token = localStorage.getItem("token");
            if (!token) {
                console.log("Token not found");
            } else {
                req.headers["authorization"] = "Bearer " + token;
            }
            return req;
        },

        function (error) {
            console.log("Error faced", error.message)

            return Promise.reject(error)
        }
    )

    axios.interceptors.response.use(
        function (res) {

            return res;
        },

        async function (error) {
            const originalRequest = error.config;
            console.log("response error ",error.message)
            console.log("Error faced", error.response.status);
            let { status } = error.response;
            if(status === 403 && localStorage.getItem('token') && !originalRequest._retry){
                originalRequest._retry = true;
                await getNewToken();
                return axios(originalRequest)
            }

            if (status === 403 || status === 400) {
                history.push("/login")
            }
            return Promise.reject(error)
        }
    )

}