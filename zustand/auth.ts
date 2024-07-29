import { create } from 'zustand'
import axios, { AxiosResponse } from 'axios'
import { api } from '@/apis'
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface AuthState {
    user: { username: string; password: string, token: string, email: string } | null
    err: string | null
    response: AxiosResponse | null // Assuming response from API contains user data
    login: (username: string, password: string) => void
    signUp: (username: string, password: string, email: string) => void
    logout: () => void
    getUserFromStorage: (me: string) => void
    // Add other properties here
}
export const useAuth = create<AuthState>((set) => ({
    user: null,
    response: null,
    err: null,
    login: async (username, password) => {
        set(() => ({ response: null, err: null }));
        try {
            const res = await axios.post(`${api}/auth/login`, { username, password });
            const responseData = JSON.stringify(res.data.user);
            await AsyncStorage.setItem('me', responseData);
            set(() => ({ response: res, err: null, user: res.data.user }));
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
    },
    logout: async () => {
        set(() => ({ response: null, err: null, user: null }));
        await AsyncStorage.setItem('my-token', "");
    },
    getUserFromStorage: async () => {
        const jsonValue = await AsyncStorage.getItem('me');
        const me = jsonValue != null ? JSON.parse(jsonValue) : null;
        set(() => ({ user: me }));
    }
}));