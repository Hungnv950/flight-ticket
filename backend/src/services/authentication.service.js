import axios from "axios";
import { BehaviorSubject } from 'rxjs';

const jwtToken = new BehaviorSubject(localStorage.getItem('jwtToken'));
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    jwtToken,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    return axios.post('/api/admin/auth/login', {
        username,
        password
        }).then(response => {
        localStorage.setItem('jwtToken', response.data.token);
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));

        currentUserSubject.next(response.data.user);

        return response.data.user;
    });
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}