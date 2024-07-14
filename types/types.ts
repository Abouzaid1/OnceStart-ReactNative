export type ProjectType = {
    id: number,
    name: string,
    members: number,
    UncompletedTasks: TaskType[]
}
export type TaskType = {
    id: number,
    title: string,
    completed: boolean,
    startsIn: string | null,
    endsIn: string
}
export type LockedProjectType = {
    id: number,
    name: string,
    members: number,
    UncompletedTasks: TaskType[],
}