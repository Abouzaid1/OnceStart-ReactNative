import { create } from 'zustand'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { api } from '@/apis'
import { PostType, TaskSent, TaskType } from '@/types/types'
import { useAuth } from './auth'
import { useProject } from './projectState'
import { Alert, Platform } from 'react-native'
type PostState = {
    posts: PostType[] | [],
    response: AxiosResponse | null,
    err: string | null,
    getPosts: () => void,
    addPost: (title: string, content: string, photos: any) => void,
}

export const usePost = create<PostState>((set) => ({
    posts: [],
    response: null,
    err: null,
    getPosts: async () => {
        set(() => ({ response: null, err: null, singleProject: null, singleProjectTasks: [], isLeader: false, projects: [] }));
        try {
            const user = useAuth.getState().user;
            const response = await axios.get(api + '/posts', { headers: { 'Authorization': user?.token } })
            set(() => ({ posts: response.data.posts }));
        } catch (e: any) {
            set(() => ({ err: e.response.data.message }));
        }

    },
    addPost: async (title, content, photos) => {
        const user = useAuth.getState().user;
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            const photosArr: any = []
            // Append photos if they exist
            if (photos && photos.length > 0) {
                photos.forEach((photo: any) => {
                    const file: any = {
                        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
                        name: photo.fileName,
                        type: photo.mimeType || 'image/jpeg', // Ensure you use the correct MIME type if available
                    };


                    photosArr.push(file)
                });
            }
            console.log(photosArr);
            formData.append('photos', photosArr); // Append each photo to the same key 'photos'

            console.log(formData);
            await axios.post(api + "/posts", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': user?.token
                },
            });

            set(() => ({ response: null, err: null }));
        } catch (e: any) {
            const msg = e.response?.data?.message;
            set(() => ({ response: null, err: msg }));
        }
    }
}));