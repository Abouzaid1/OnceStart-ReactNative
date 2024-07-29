import { UserType } from './../types/types';
import { create } from 'zustand'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { api } from '@/apis'
import { MainProjectType, TaskSent, TaskType } from '@/types/types'
import { useAuth } from './auth'

type ProjectState = {
    projects: MainProjectType[] | [],
    singleProject: MainProjectType | null,
    singleProjectTasks: TaskType[] | [],
    response: AxiosResponse | null,
    isLeader: boolean | null,
    err: string | null,
    getProjects: () => void,
    createProject: (name: string, passcode: string, color: string) => void,
    getSpecifecProject: (id: string | string[] | undefined) => void,
    addTaskInProject: (projectId: string | string[] | undefined, task: TaskSent) => void
}


export const useProject = create<ProjectState>((set) => ({
    projects: [],
    singleProject: null,
    singleProjectTasks: [],
    response: null,
    isLeader: null,
    err: null,
    getProjects: async () => {
        set(() => ({ response: null, err: null, singleProject: null, singleProjectTasks: [], isLeader: false }));
        try {
            const user = useAuth.getState().user;
            const response = await axios.get(api + '/projects', { headers: { 'Authorization': user?.token } })
            set(() => ({ projects: response.data.projects }));
        } catch (error: any) {
            set(() => ({ err: error.response.data.message }));
        }
    },
    createProject: async (name, passcode, color) => {
        set(() => ({ response: null, err: null }));
        try {
            const user = useAuth.getState().user;
            const response = await axios.post(api + '/projects', { name, passcode, color }, { headers: { 'Authorization': user?.token } })
            const projects = useProject.getState().projects;
            const newProjects = [...projects, response.data.newProject];
            set(() => ({ projects: newProjects }));
        } catch (e: any) {
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
            set(() => ({ err: e.response.data.message }));
        }
    },
    addTaskInProject: async (projectId, task) => {
        try {
            const user = useAuth.getState().user;
            const response = await axios.post(api + `/projects/${projectId}`, task, { headers: { 'Authorization': user?.token } })
            const singleProjectTasks = useProject.getState().singleProjectTasks;
            const newSingleProjectTasks = [...singleProjectTasks, response.data.newTask]
            set(() => ({ singleProjectTasks: newSingleProjectTasks }));
        } catch (e: any) {
            set(() => ({ err: e.response.data.message }));
        }
    }
}))