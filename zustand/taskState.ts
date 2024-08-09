import { create } from 'zustand'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { api } from '@/apis'
import { TaskSent, TaskType } from '@/types/types'
import { useAuth } from './auth'
import { useProject } from './projectState'
import { Alert } from 'react-native'
type TaskState = {
    tasks: TaskType[],
    response: AxiosResponse | null,
    err: string | null,
    getTasks: () => void,
    addTask: (task: TaskSent) => void,
    deleteTask: (taskId: string) => void,
    editTask: (taskId: string, { }: { completed: boolean | null, startsIn: string | null, endsIn: string | null }) => void
}

export const useTask = create<TaskState>((set) => ({
    tasks: [],
    response: null,
    err: null,
    getTasks: async () => {
        try {
            const user = useAuth.getState().user;
            const response = await axios.get(api + '/tasks', { headers: { 'Authorization': user?.token } })
            set(() => ({ response: response, tasks: response.data.tasks }));
        } catch (e: any) {
            Alert.alert("Wait!", e.response.data.message)
            const msg = e.response.data.message
            set(() => ({ err: msg }));
        }
    },
    addTask: async (task) => {
        set(() => ({ response: null, err: null }));
        try {
            const user = useAuth.getState().user;
            const response = await axios.post(api + '/tasks', task, { headers: { 'Authorization': user?.token } });
            const tasks = useTask.getState().tasks;
            const newTasks = [...tasks, response.data.newTask];
            set(() => ({ tasks: newTasks }));
        } catch (e: any) {
            Alert.alert("Wait!", e.response.data.message)
            set(() => ({ err: e.response.data.message }));
        }
    },
    deleteTask: async (taskId) => {
        set(() => ({ response: null, err: null }));
        try {
            const user = useAuth.getState().user;
            await axios.delete(api + `/tasks/${taskId}`, { headers: { 'Authorization': user?.token } });
            const tasks = useTask.getState().tasks;
            const updatedTasks = tasks?.filter(task => task._id !== taskId);
            set(() => ({ tasks: updatedTasks }));
            const singleProjectTasks = useProject.getState().singleProjectTasks;
            if (singleProjectTasks.length > 0) {
                const singleProjectTasksUpdate = singleProjectTasks?.filter(task => task._id !== taskId);
                useProject.setState(() => ({ singleProjectTasks: singleProjectTasksUpdate }));
            }
        } catch (e: any) {
            Alert.alert("Wait!", e.response.data.message)
            set(() => ({ err: e.response.data.message }));
        }
    },
    editTask: async (taskId, edit) => {
        set(() => ({ response: null, err: null }));
        try {
            const user = useAuth.getState().user;
            const response = await axios.put(api + `/tasks/${taskId}`, edit, { headers: { 'Authorization': user?.token } });
            const updatedTask = response.data.updatedTask;
            const tasks = useTask.getState().tasks;
            const updatedTasks = tasks.map((item) =>
                item._id === updatedTask._id ? { ...item, ...updatedTask } : item
            );

            set(() => ({ tasks: updatedTasks }));
            // Update tasks in the single project state
            const singleProjectTasks = useProject.getState().singleProjectTasks;
            if (singleProjectTasks.length > 0) {
                const singleProjectTasksUpdate = singleProjectTasks.map((item) =>
                    item._id === updatedTask._id ? { ...item, ...updatedTask } : item
                );
                console.log("Single project tasks updated");

                useProject.setState(() => ({ singleProjectTasks: singleProjectTasksUpdate }));
            }

        } catch (e: any) {
            Alert.alert("Wait!", e.response.data.message)
            set(() => ({ err: e.response.data.message }));
        }
    }
}));