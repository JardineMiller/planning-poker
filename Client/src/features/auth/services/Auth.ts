﻿import type AuthenticationResponse from "@/features/auth/models/AuthResponse";
import type LoginRequest from "@/features/auth/models/LoginRequest";
import User from "@/features/auth/models/User";
import router from "@/services/router";
import axios from "axios";

const LOGIN_URL = `https://localhost:7097/api/auth/login`;
const REFRESH_TOKEN_URL = `https://localhost:7097/api/auth/refreshToken`;
const REVOKE_TOKEN_URL = `https://localhost:7097/api/auth/revokeToken`;

let _authToken: string | null = null;
let _user: User | null = null;

let refreshTokenTimeout: NodeJS.Timeout | null = null;

function startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    if (!_authToken) {
        return;
    }

    const jwtBase64 = _authToken.split(".")[1];
    const jwtToken = JSON.parse(atob(jwtBase64));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
    refreshTokenTimeout?.refresh();
}

const isAuthenticated = () => {
    return Boolean(_user) && Boolean(_authToken);
};

const login = async (request: LoginRequest): Promise<void> => {
    return axios
        .post<AuthenticationResponse>(LOGIN_URL, request, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        })
        .then(async (response) => {
            const { id, firstName, lastName, email, token } =
                response.data;

            _user = new User(id, firstName, lastName, email);
            _authToken = token;

            startRefreshTokenTimer();

            await router.push("/");

            return response;
        })
        .catch((error) => {
            return error;
        });
};

const logout = async (): Promise<void> => {
    axios.post(
        REVOKE_TOKEN_URL,
        {},
        {
            headers: { "Content-Type": "application/json" },
        }
    );

    _user = null;
    _authToken = null;

    stopRefreshTokenTimer();

    await router.push("/login");
};

const refreshToken = async (): Promise<void> => {
    axios
        .get<AuthenticationResponse>(REFRESH_TOKEN_URL, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        })
        .then(async (response) => {
            const { id, firstName, lastName, email, token } =
                response.data;

            _user = new User(id, firstName, lastName, email);
            _authToken = token;

            startRefreshTokenTimer();

            await router.push("/");

            return response;
        })
        .catch((error) => {
            return error;
        });
};

const user = () => {
    return _user;
};

const token = () => {
    return _authToken;
};

export default {
    user: user,
    token: token,
    isAuthenticated: isAuthenticated,
    login: login,
    logout: logout,
    refreshToken: refreshToken,
};
