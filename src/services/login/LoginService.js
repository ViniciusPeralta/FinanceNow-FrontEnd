import axios from 'axios'

class LoginService {
    async executeLogin(username, password) {
        return await axios.get('http://localhost:8080/user/login?username=' + username +
            '&password=' + password)
    }
}

export default new LoginService();