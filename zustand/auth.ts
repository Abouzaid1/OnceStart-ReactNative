import { create } from 'zustand'
import axios, { AxiosResponse } from 'axios'
import { api } from '@/apis'
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface AuthState {
    user: { username: string; password: string, token: string, email: string, photo: string } | null
    err: string | null
    response: AxiosResponse | null // Assuming response from API contains user data
    login: (username: string, password: string) => void
    signUp: (username: string, password: string, email: string, photo: any) => void
    logout: () => void
    getUserFromStorage: (me: string) => void
    // Add other properties here
}
const uriToBlob = async (uri: any) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
};
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
    signUp: async (username, email, password, photo) => {
        set(() => ({ response: null, err: null, user: null }));
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            const file: any = {
                uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
                name: photo.fileName,
                type: 'image/jpeg',
            };
            // Append photo if it exists
            if (photo) {
                formData.append('photo', file); // Name the file appropriately
            }
            const res = await axios.post(`${api}/auth/signup`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            set(() => ({ response: res, err: null, user: res.data }));
        } catch (e: any) {
            const msg = e.response?.data?.message;
            set(() => ({ response: null, err: msg }));
        }
    },
    logout: async () => {
        set(() => ({ response: null, err: null, user: null }));
        await AsyncStorage.setItem('my-token', "");
        await AsyncStorage.setItem('me', "");
    },
    getUserFromStorage: async () => {
        const jsonValue = await AsyncStorage.getItem('me');
        const me = jsonValue != null ? JSON.parse(jsonValue) : null;
        set(() => ({ user: me }));
    }
}));