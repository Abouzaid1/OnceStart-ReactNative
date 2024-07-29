import dayjs from 'dayjs';
// export type ProjectType = {
//     _id: string,
//     name: string,
//     members: string[],
//     UncompletedTasks: TaskType[],
//     tasks: TaskType[] | [],
// }
export type MainProjectType = {
    _id: string,
    name: string,
    members: UserType[],
    tasks: TaskType[] | [],
    leader: UserType,
    color: string,
    passcode: string,
    UncompletedTasks: TaskType[] | [],
}
export type UserType = {
    _id: string,
    username: string,
    email: string | null,
}
export type TaskType = {
    _id: string,
    title: string,
    completed: boolean,
    createdAt: string,
    startsIn: string | null,
    endsIn: string | null
}
export type TaskSent = {
    title: string,
    startsIn: string | number | dayjs.Dayjs | Date | null,
    endsIn: string | number | dayjs.Dayjs | Date | null
}
export type LockedProjectType = {
    id: number,
    name: string,
    members: number,
    UncompletedTasks: TaskType[],
}