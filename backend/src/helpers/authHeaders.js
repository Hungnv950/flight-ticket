import { authenticationService } from '../services/authentication.service';

export function authHeader() {
    const jwtToken = authenticationService.jwtToken;
    if (jwtToken) {
        return { Authorization: `Bearer ${jwtToken.value}` };
    } else {
        return {};
    }
}