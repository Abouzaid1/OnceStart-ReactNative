import { TaskInProjectType, UserType } from './../types/types';
import { create } from 'zustand'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { api } from '@/apis'
import { MainProjectType, TaskSent, TaskType } from '@/types/types'
import { useAuth } from './auth'
import { Alert } from 'react-native';

type ProjectState = {
    projects: MainProjectType[] | [],
    singleProject: MainProjectType | null,
    singleProjectTasks: TaskInProjectType[] | [],
    response: AxiosResponse | null,
    isLeader: boolean | null,
    err: string | null,
    getProjects: () => void,
    createProject: (name: string, passcode: string, color: string) => void,
    getSpecifecProject: (id: string | string[] | undefined) => void,
    addTaskInProject: (projectId: string | string[] | undefined, task: TaskSent) => void
    joinProjects: (projectId: string, passcode: string) => void
    deleteProject: (projectId: string | string[] | undefined) => void
    removePersonFromProject: (projectId: string | string[] | undefined, personId: string) => void
}


export const useProject = create<ProjectState>((set) => ({
    projects: [],
    singleProject: null,
    singleProjectTasks: [],
    response: null,
    isLeader: null,
    err: null,
    getProjects: async () => {
        set(() => ({ response: null, err: null, singleProject: null, singleProjectTasks: [], isLeader: false, projects: [] }));
        try {
            const user = useAuth.getState().user;
            const response = await axios.get(api + '/projects', { headers: { 'Authorization': user?.token } })
            console.log(response.data.projects);

            set(() => ({ projects: response.data.projects }));
        } catch (e: any) {
            set(() => ({ err: e.response.data.message }));
        }
    },
    createProject: async (name, passcode, color) => {
        set(() => ({ response: null, err: null }));
        try {
            const user = useAuth.getState().user;
            const response = await axios.post(api + '/projects', { name, passcode, color }, { headers: { 'Authorization': user?.token } })
            const projects = useProject.getState().projects;
            const newProjects = [...projects, response.data.project]
            set(() => ({ projects: newProjects }));
        } catch (e: any) {
            Alert.alert("Wait!", e.response.data.message)
            set(() => ({ err: e.response.data.message }));
        }
    },
    getSpecifecProject: async (id) => {
        set(() => ({ response: null, err: null, singleProject: null, singleProjectTasks: [] }));
        try {
            const user = useAuth.getState().user;
            const response = await axios.get(api + `/projects/${id}`, { headers: { 'Authorization': user?.token } })
            set(() => ({ singleProject: response.data.project, singleProjectTasks: response.data.project.tasks }));
            const leader = response.data.project.leader
            if (leader.username == user?.username) {
                set(() => ({ isLeader: true }));
            }
        } catch (e: any) {
            Alert.alert("Wait!", e.response.data.message)
            set(() => ({ err: e.response.data.message }));
        }
    },
    addTaskInProject: async (projectId, task) => {
        try {
            const user = useAuth.getState().user;
            const response = await axios.post(api + `/projects/${projectId}`, task, { headers: { 'Authorization': user?.token } })
            const singleProjectTasks = useProject.getState().singleProjectTasks;
            const newSingleProjectTasks = [...singleProjectTasks, response.data.populatedTasks]
            set(() => ({ singleProjectTasks: newSingleProjectTasks }));
        } catch (e: any) {
            Alert.alert("Wait!", e.response.data.message)
            set(() => ({ err: e.response.data.message }));
        }
    },
    joinProjects: async (projectId, passcode) => {
        try {
            const user = useAuth.getState().user;
            console.log(projectId);
            const response = await axios.put(api + `/projects/${projectId}`, { projectId, passcode }, { headers: { 'Authorization': user?.token } })
            set(() => ({ response: response }));
        } catch (e: any) {
            Alert.alert("Wait!", e.response.data.message)
            set(() => ({ err: e.response.data.message }));
        }
    },
    deleteProject: async (projectId) => {
        try {
            const user = useAuth.getState().user;
            const response = await axios.delete(api + `/projects/${projectId}`, { headers: { 'Authorization': user?.token } })
            console.log(response.data.message);
        } catch (e: any) {
            Alert.alert("Wait!", e.response.data.message)
            set(() => ({ err: e.response.data.message }));
        }
    },
    removePersonFromProject: async (projectId, personId) => {
        try {
            const user = useAuth.getState().user;
            const response = await axios.put(api + `/projects`, { projectId, personId }, { headers: { 'Authorization': user?.token } })
            console.log(response.data.project);
            set(() => ({ singleProject: response.data.project }));
        } catch (e: any) {
            Alert.alert("Wait!", e.response.data.message)
            set(() => ({ err: e.response.data.message }));
        }

    }
}))