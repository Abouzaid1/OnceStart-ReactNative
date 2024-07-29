import { Link, useLocalSearchParams } from 'expo-router'
import { useProject } from '@/zustand/projectState'
import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView, Alert, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Handshake, SearchX, Send } from 'lucide-react-native';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import Task from '@/components/Task';
import { useTask } from '@/zustand/taskState'
import { useAuth } from '@/zustand/auth'
import { TaskType } from '@/types/types'
export default function ProjectDetails() {
    const [writingTask, setWriting] = useState<boolean>(false)
    const [taskTitle, setTaskTitle] = useState<string>("")
    const [startsIn, setStartsIn] = useState<DateType | undefined>(undefined)
    const [endsIn, setEndsIn] = useState<DateType | undefined>(undefined)
    const [completedTasksCounterRatio, setCompletedTasksCounterRatio] = useState<number>(0)
    const { id } = useLocalSearchParams()
    const { getSpecifecProject, singleProject, addTaskInProject, singleProjectTasks, isLeader } = useProject(state => state)
    useEffect(() => {
        let counter = 0
        if (singleProject?.tasks.length != 0) {
            singleProject?.tasks.map((item) => {
                if (item.completed == true) {
                    counter++
                }
            })
        }
        const ratio = singleProject?.tasks.length != undefined ? (counter) / singleProject?.tasks.length : 0
        setCompletedTasksCounterRatio(ratio * 100);
    }, [singleProject])
    useEffect(() => {
        if (taskTitle.length > 0) {
            setWriting(true)
        } else {
            setWriting(false)
        }
    }, [taskTitle])
    const addTaskFunc = () => {
        if (taskTitle.trim() !== '') {
            console.log(startsIn, endsIn);

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
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await getSpecifecProject(id);
        setRefreshing(false);
    }, []);
    useEffect(() => {
        getSpecifecProject(id)
    }, [])
    // useEffect(() => {
    //     console.log("project", singleProject);
    // }, [singleProject])
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            style={style.container}>
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
                    width: "100%"
                }}
            >

                {
                    isLeader ? <TouchableOpacity style={{
                        width: 120,
                        backgroundColor: "red",
                        paddingHorizontal: 2,
                        paddingVertical: 5,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link href={"/Projects"}>
                            <Text style={{ fontWeight: "600", color: "white", }}>Delete Project</Text>
                        </Link>
                    </TouchableOpacity> : <TouchableOpacity style={{
                        width: 120,
                        backgroundColor: "red",
                        paddingHorizontal: 2,
                        paddingVertical: 5,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link href={"/Projects"}>
                            <Text style={{ fontWeight: "600", color: "white", }}>Leave Project</Text>
                        </Link>
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
                        <Task item={item} />
                    )
                }} />
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191b26',
        paddingTop: 10,
        paddingHorizontal: 20  // center the text horizontally and vertically in the view.
    },
    datePicker: {
        backgroundColor: '#191b26',
        width: 300,
        height: 350,
        color: '#fff',
    },
}) 