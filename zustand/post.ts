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
    addPost: (content: string, photos: any) => void,
    likePost: (postId: string) => void,
}
const uriToBlob = async (uri: any) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
};
export const usePost = create<PostState>((set) => ({
    posts: [],
    response: null,
    err: null,
    getPosts: async () => {
        set(() => ({ response: null, err: null, posts: [] }));
        try {
            const user = useAuth.getState().user;
            const response = await axios.get(api + '/posts', { headers: { 'Authorization': user?.token } })
            set(() => ({ posts: response.data.posts }));
        } catch (e: any) {
            set(() => ({ err: e.response.data.message }));
        }
    },
    addPost: async (content, photos) => {
        const user = useAuth.getState().user;
        try {
            const formData = new FormData();
            formData.append('content', content);

            // Append photos if they exist
            if (photos && photos.length > 0) {
                for (const photo of photos) {
                    const blob = await uriToBlob(photo.uri);
                    const file: any = {
                        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
                        name: photo.fileName || `photo_${Date.now()}.jpg`,
                        type: photo.mimeType || 'image/jpeg',
                    };
                    formData.append('photos', file); // Append each photo to 'photos'
                }
            }

            const response = await axios.post(api + "/posts", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': user?.token,
                },
            });
            const posts = usePost.getState().posts;
            const newPost = response.data.newPost
            const newPosts = [newPost, ...posts]
            console.log(newPosts);

            set(() => ({ response: null, err: null, posts: newPosts }));
        } catch (e: any) {
            const msg = e.response?.data?.message;
            set(() => ({ response: null, err: msg }));
        }
    },
    likePost: async (postId) => {
        try {
            const user = useAuth.getState().user;
            const response = await axios.get(`${api}/posts/${postId}`, {
                headers: { 'Authorization': user?.token }
            });

            const posts = usePost.getState().posts;
            const updatedPost = response.data.newPost;

            const updatedPosts = posts.map((item) =>
                item._id === updatedPost._id ? { ...item, ...updatedPost } : item
            );

            console.log('Updated Posts:', updatedPosts); // Debugging
            set(() => ({ posts: updatedPosts }));
        } catch (e: any) {
            console.error('Error:', e); // Improved error logging
            set(() => ({ err: e.response?.data?.message || 'An unexpected error occurred' }));
        }
    }
}));