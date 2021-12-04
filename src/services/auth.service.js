import api from './api';
import TokenService from "./token.service";

const register = (email, password) => {
    return api.post('/auth/signup', {
        email,
        password
    });
};

const login = (email, password) => {
    return api
        .post('/auth/signin', {
            email,
            password,
        })
        .then((res) => {
            if (res.data.accessToken) {
                TokenService.setUser(res.data);
            }
            return res.data;
        });
};

const logout = () => {
    TokenService.removeUser();
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;