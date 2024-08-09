import { Link, useLocalSearchParams } from 'expo-router'
import { useProject } from '@/zustand/projectState'
import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView, Alert, RefreshControl } from 'react-native'
import Animated, { ReduceMotion, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { CircleUserRound, Delete, Eraser, Handshake, Mail, PersonStanding, SearchX, Send } from 'lucide-react-native';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import Task from '@/components/Task';
import { useTask } from '@/zustand/taskState'
import { useAuth } from '@/zustand/auth'
import { TaskType, UserType } from '@/types/types'
import { ActionSheet } from 'react-native-ui-lib'
import { Image } from 'react-native'
import { useRouter } from 'expo-router'
import { Dialog, Portal } from 'react-native-paper'
import { uploadsApi } from '@/apis'
import TaskInProject from '@/components/TaskInProject'
export default function ProjectDetails() {
    const [actionSheet, setActionSheet] = useState<boolean>(false)
    const [dialogDelete, setDialogDelete] = useState<boolean>(false)
    const [writingTask, setWriting] = useState<boolean>(false)
    const [taskTitle, setTaskTitle] = useState<string>("")
    const [startsIn, setStartsIn] = useState<DateType | undefined>(undefined)
    const [endsIn, setEndsIn] = useState<DateType | undefined>(undefined)
    const [completedTasksCounterRatio, setCompletedTasksCounterRatio] = useState<number>(0)
    const { id } = useLocalSearchParams()
    const { getSpecifecProject,
        singleProject,
        addTaskInProject,
        singleProjectTasks,
        isLeader,
        deleteProject,
        removePersonFromProject } = useProject(state => state)
    const { tasks } = useTask(state => state)
    const router = useRouter()
    useEffect(() => {
        let counter = 0
        if (singleProjectTasks.length != 0) {
            singleProjectTasks.map((item) => {
                if (item.completed == true) {
                    counter++
                }
            })
        }
        const ratio = singleProject?.tasks.length != undefined ? (counter) / singleProjectTasks.length : 0
        setCompletedTasksCounterRatio(ratio * 100);
    }, [tasks, singleProjectTasks])
    useEffect(() => {
        if (taskTitle.length > 0) {
            setWriting(true)
        } else {
            setWriting(false)
        }
    }, [taskTitle])
    const addTaskFunc = () => {
        if (taskTitle.trim() !== '') {
            const task = {
                title: taskTitle,
                startsIn: startsIn != undefined ? startsIn : null,
                endsIn: endsIn != undefined ? endsIn : null
            }
            addTaskInProject(id, task);
            setTaskTitle('');
            setStartsIn(undefined)
            setEndsIn(undefined)
            setWriting(false)  // Clear input after adding the task
        } else {
            Alert.alert("Wait!", 'Task title is required');
        }
    }
    const deleteProjectHandler = () => {
        deleteProject(id)
        router.replace("/Projects")
    }
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await getSpecifecProject(id);
        setRefreshing(false);
    }, []);
    useEffect(() => {
        getSpecifecProject(id)
    }, [])
    const scale = useSharedValue(1);
    const animationHandler = () => {
        if (actionSheet || dialogDelete) {
            scale.value = withSpring(0.95)
        } else {
            scale.value = withSpring(1)
        }
    }
    useEffect(() => { animationHandler() }, [actionSheet, dialogDelete])
    const removePersonHandler = (personId: string) => {
        removePersonFromProject(id, personId)
    }
    return (
        <>
            <Portal>
                <Dialog style={{ backgroundColor: "white" }} visible={dialogDelete} onDismiss={() => setDialogDelete(false)}>
                    <Dialog.Icon icon="alert" />
                    <Dialog.Title style={{ textAlign: "center", fontSize: 20, color: "black" }}>What!!</Dialog.Title>
                    <Dialog.Content>
                        <Text>Are you sure that you want to delete this project</Text>
                    </Dialog.Content>
                    <View style={{ marginVertical: 10, gap: 20, marginHorizontal: 20, flexDirection: "row", justifyContent: "flex-end" }}>
                        <TouchableOpacity onPress={() => setDialogDelete(false)} style={{
                            width: 80,
                            paddingHorizontal: 2,
                            paddingVertical: 5,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            borderColor: "black",
                            borderWidth: 1
                        }}>
                            <Text style={{ color: "black", fontWeight: "800" }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={deleteProjectHandler} style={{
                            width: 50,
                            paddingHorizontal: 2,
                            paddingVertical: 5,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            borderColor: "red",
                            borderWidth: 1
                        }}>
                            <Text style={{ color: "red", fontWeight: "800" }}>Sure</Text>
                        </TouchableOpacity>
                    </View>
                </Dialog>
            </Portal>
            <ActionSheet
                onDismiss={() => { setActionSheet(false) }}
                cancelButtonIndex={3}
                destructiveButtonIndex={0}
                containerStyle={{ backgroundColor: "#191b26" }}
                dialogStyle={{
                    padding: 20,
                    backgroundColor: "#191b26",
                    height: 600,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    borderWidth: 1,
                    borderColor: singleProject?.color
                }}
                options={[
                    { label: '', onPress: () => { } },
                ]}
                renderAction={() => {
                    return (
                        <>
                            <Text style={{
                                marginTop: 20,
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 22
                            }}>Leader</Text>
                            <View style={{
                                borderColor: "gray",
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                marginVertical: 10,
                                justifyContent: "center",
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 5
                                }}>
                                    {
                                        singleProject?.leader.photo ? <Image source={{ uri: uploadsApi + `${singleProject?.leader.photo}` }} style={{ width: 30, height: 30, borderRadius: 50 }} /> :
                                            <CircleUserRound color={"white"} />
                                    }

                                    <Text style={{
                                        color: "white",
                                        fontSize: 18,
                                        fontWeight: "bold"

                                    }}>{singleProject?.leader.username}</Text>
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 5
                                }}>
                                    <Mail color={"white"} />
                                    <Text style={{
                                        color: "white",
                                        fontSize: 18,
                                    }}>{singleProject?.leader.email}</Text>
                                </View>

                            </View>
                            <Text style={{
                                marginTop: 20,
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 22
                            }}>Members</Text>
                            <FlatList
                                data={singleProject?.members}
                                renderItem={({ item }) => {
                                    return (
                                        <View key={item.username} style={{
                                            borderColor: "gray",
                                            flexDirection: "row",
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            paddingHorizontal: 10,
                                            paddingVertical: 10,
                                            marginVertical: 10,
                                            justifyContent: "space-between",
                                            alignItems: "center",

                                        }}>
                                            <View>
                                                <View style={{
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    gap: 5
                                                }}>
                                                    {
                                                        item.photo ? <Image source={{ uri: uploadsApi + `${item.photo}` }} style={{ width: 40, height: 40, borderRadius: 50 }} /> :
                                                            <CircleUserRound color={"white"} />
                                                    }

                                                    <Text style={{
                                                        color: "white",
                                                        fontSize: 18,
                                                        fontWeight: "bold"

                                                    }}>{item.username}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    gap: 5
                                                }}>
                                                    <Mail color={"white"} />
                                                    <Text style={{
                                                        color: "white",
                                                        fontSize: 18,
                                                    }}>{item.email}</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <TouchableOpacity
                                                    onPress={() => removePersonHandler(item._id)}
                                                    style={{
                                                        marginRight: 10,
                                                        width: 40,
                                                        height: 40,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}>
                                                    <Delete color={"#fcf7d2"} size={30}></Delete>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    )
                                }}
                            />
                        </>
                    )
                }}
                visible={actionSheet} />
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,
                    backgroundColor: '#191b26',
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                }}>
                <Animated.View style={{
                    transform: [{ scale: scale }],
                }}>

                    <Text style={{
                        marginTop: 60,
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 28
                    }}> Project name:
                        <Text style={{
                            color: `${singleProject?.color}`
                        }}> {singleProject?.name}
                        </Text>
                    </Text>
                    <Text style={{
                        marginTop: 20,
                        color: "white",
                        fontSize: 20
                    }}> Project code:
                        <Text style={{
                            color: `${singleProject?.color}`
                        }}> {singleProject?.passcode}
                        </Text>
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            width: "100%",
                            gap: 5,
                            marginTop: 20
                        }}
                    >
                        <TouchableOpacity onPress={() => { setActionSheet(true) }} style={{
                            width: 120,
                            backgroundColor: singleProject?.color,
                            paddingHorizontal: 2,
                            paddingVertical: 5,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text style={{ fontWeight: "600", color: "white", }}>View Members</Text>
                        </TouchableOpacity>
                        {
                            isLeader ? <TouchableOpacity
                                onPress={() => { setDialogDelete(true) }}
                                style={{
                                    width: 120,
                                    backgroundColor: "red",
                                    paddingHorizontal: 2,
                                    paddingVertical: 5,
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                <Text style={{ fontWeight: "600", color: "white", }}>Delete Project</Text>
                            </TouchableOpacity> : <TouchableOpacity onPress={() => { setDialogDelete(true) }} style={{
                                width: 120,
                                backgroundColor: "red",
                                paddingHorizontal: 2,
                                paddingVertical: 5,
                                borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Text style={{ fontWeight: "600", color: "white", }}>Leave Project</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={
                        {
                            width: "100%",
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            marginTop: 20,
                            borderWidth: 1,
                            borderColor: `${singleProject?.color}`,
                            borderRadius: 10,
                        }
                    }>
                        <Text style={{
                            color: "white",
                            fontWeight: "600",
                            fontSize: 18
                        }}>Project<Text style={{
                            color: `${singleProject?.color}`
                        }}> progress</Text></Text>
                        <View style={{
                            width: "100%",
                            margin: "auto",
                            borderColor: `${singleProject?.color}`,
                            borderWidth: 1,
                            borderRadius: 10,
                            height: 15,
                            marginTop: 20,
                            overflow: "hidden"
                        }}>
                            <View style={{
                                width: `${completedTasksCounterRatio}%`,
                                backgroundColor: `${singleProject?.color}`,
                                height: 15,
                            }}>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: "flex", marginVertical: 20, justifyContent: "center", alignItems: "center", gap: 5, flexDirection: "row", width: "100%", marginBottom: 10 }}>
                        <TextInput style={{
                            borderColor: `${singleProject?.color}`,
                            borderWidth: 1,
                            borderRadius: 10,
                            fontSize: 15,
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            color: "white",
                            width: "80%"
                        }}
                            onChangeText={setTaskTitle}
                            value={taskTitle}
                            placeholder='Enter a task' placeholderTextColor={"gray"}
                        />
                        <TouchableOpacity
                            onPress={addTaskFunc}
                            style={{
                                backgroundColor: `${singleProject?.color}`,
                                paddingHorizontal: 15,
                                paddingVertical: 13,
                                borderRadius: 10,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Send color={"black"} />
                        </TouchableOpacity>
                    </View>
                    {
                        writingTask &&
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            padding: 10,
                        }}>
                            <View style={style.datePicker}>
                                <DateTimePicker
                                    mode="range"
                                    startDate={startsIn}
                                    endDate={endsIn}
                                    onChange={({ startDate, endDate }) => {
                                        setStartsIn(startDate)
                                        setEndsIn(endDate)
                                    }}
                                    calendarTextStyle={{ color: 'white' }}
                                    headerTextStyle={{ color: 'white' }}
                                    todayTextStyle={{ color: 'white' }}
                                    timePickerTextStyle={{ color: 'white' }} headerButtonColor='white'
                                    weekDaysTextStyle={{ color: 'white' }}
                                    selectedItemColor={singleProject?.color}
                                    selectedTextStyle={{ color: '#191b26' }}

                                />
                            </View>
                        </View>
                    }
                    <FlatList
                        scrollEnabled={false}
                        ListEmptyComponent={
                            () => {
                                return (
                                    <View style={{
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 50,
                                        height: 200
                                    }}>
                                        <SearchX size={100} color={"white"} />
                                        <Text style={{
                                            color: "white",
                                            fontWeight: "600",
                                            fontSize: 18,
                                            textAlign: "center"
                                        }}>No Tasks created yet </Text>
                                    </View>
                                )
                            }
                        }
                        style={{}} data={singleProjectTasks} renderItem={({ item }) => {
                            return (
                                <TaskInProject key={item._id} item={item} />
                            )
                        }} />
                </Animated.View>
            </ScrollView>
        </>
    )
}

const style = StyleSheet.create({
    container: {

        // center the text horizontally and vertically in the view.
    },
    datePicker: {
        backgroundColor: '#191b26',
        width: 300,
        height: 350,
        color: '#fff',
    },
}) 