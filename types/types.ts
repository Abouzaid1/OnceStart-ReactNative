import dayjs from 'dayjs';
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
    photo: string | null,
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
export type TaskInProjectType = {
    _id: string,
    title: string,
    completed: boolean,
    createdAt: string,
    startsIn: string | null,
    endsIn: string | null,
    userCreated: UserType

}
export type TaskSent = {
    title: string,
    startsIn: string | number | dayjs.Dayjs | Date | null,
    endsIn: string | number | dayjs.Dayjs | Date | null
}
export type LockedProjectType = {
    _id: string,
    name: string,
    members: UserType[],
    UncompletedTasks: TaskType[],
}
export type PostType = {
    _id: string,
    title: string,
    content: string,
    author: UserType,
    likes: UserType[] | [],
    photos: string[] | null,
    comment: CommentType[] | []
}

export type CommentType = {
    _id: string,
    content: string,
    author: UserType,
}

