import Api from '@/services/Api'

interface LoginData{
    username:string,
    password:string
}
export default {
    register(credentials: LoginData) {
        const res = Api().post('register', credentials)
        return res
    },
    login(credentials: LoginData) {
        const res = Api().post('login', credentials)
        return res
    }
}
 // AuthenticationService.register({
 //     account:'account',
 //     password:'word',
 // })