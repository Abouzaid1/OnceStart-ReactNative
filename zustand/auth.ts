import { create } from 'zustand'
import axios, { AxiosResponse } from 'axios'
import { api } from '@/apis'
import { Alert } from 'react-native';
interface AuthState {
    user: { username: string; password: string, token: string, email: string } | null
    err: string | null
    response: AxiosResponse | null // Assuming response from API contains user data
    login: (username: string, password: string) => void
    signUp: (username: string, password: string, email: string) => void
    // Add other properties here
}
export const useAuth = create<AuthState>((set) => ({
    user: null,
    response: null,
    err: null,
    login: async (username, password) => {
        set(() => ({ response: null, err: null, user: null }));
        try {
            const res = await axios.post(`${api}/auth/login`, { username, password });
            set(() => ({ response: res, err: null, user: res.data }));
        } catch (e: any) {
            const msg = e.response?.data?.message;
            set(() => ({ response: null, err: msg }));
        }
    },
    signUp: async (username, email, password) => {
        set(() => ({ response: null, err: null, user: null }));
        try {
            const res = await axios.post(`${api}/auth/signup`, { username, password, email });
            set(() => ({ response: res, err: null, user: res.data }));
        } catch (e: any) {
            const msg = e.response?.data?.message;
            set(() => ({ response: null, err: msg }));
        }
    }
}));