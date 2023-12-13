import axios from 'axios';

class RegisterService {
    executeRegister(user) {
        return axios.post("http://localhost:8080/user/register", JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

export default new RegisterService();