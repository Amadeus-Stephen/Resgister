import axios from 'axios'

const API_URL = 'http://localhost:8080'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const USER_SESSION_TOKEN = 'authenticatedToken'
class AuthenticationService {

    executeJwtAuthenticationService(username, password) {
        console.log(username);
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        } , response => {
            console.log(response)
        })
    }



    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        sessionStorage.setItem(USER_SESSION_TOKEN , this.createJWTToken(token))
        this.setupAxiosInterceptors(this.getSessionToken())
    }
    
    createJWTToken(token) {
        return 'Bearer ' + token
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(USER_SESSION_TOKEN);
    }
    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }
    getSessionToken() {
        let token = sessionStorage.getItem(USER_SESSION_TOKEN)
        if (token === null) return''
        return token
    }
    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()