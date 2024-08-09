import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView, Alert, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { CircleSlash, Handshake, SearchX, Send } from 'lucide-react-native';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import Task from '@/components/Task';
import { useTask } from '@/zustand/taskState';
import { useAuth } from '@/zustand/auth';
const Home = () => {
    const [writingTask, setWriting] = useState<boolean>(false)
    const [taskTitle, setTaskTitle] = useState<string>("")
    const [startsIn, setStartsIn] = useState<DateType | undefined>(undefined)
    const [endsIn, setEndsIn] = useState<DateType | undefined>(undefined)
    const user = useAuth(state => state.user)
    const { addTask, getTasks, err, tasks } = useTask(state => state)
    const [completedTasksCounterRatio, setCompletedTasksCounterRatio] = useState<number>(0)
    useEffect(() => {
        let counter = 0
        tasks.map((item) => {
            if (item.completed == true) {
                counter++
            }
        })
        const ratio = (counter) / tasks.length;
        setCompletedTasksCounterRatio(ratio * 100);
    }, [tasks])
    useEffect(() => {
        console.log(user);
        if (user != null) {
            getTasks()
            console.log("user");
        }
    }, [user])
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
            addTask(task);
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
        console.log(user);
        setRefreshing(true);
        await getTasks();
        setRefreshing(false);
    }, []);
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
                fontSize: 32
            }}>Nice to see you <Text style={{
                color: "#fcf7d2"
            }}>{user?.username}</Text> <Handshake color={"#fcf7d2"} /></Text>
            <View style={
                {
                    width: "100%",
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    marginTop: 20,
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 10,
                }
            }>
                <Text style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 18
                }}>Daily<Text style={{
                    color: "#fcf7d2"
                }}>Tasks</Text></Text>
                <View style={{
                    width: "100%",
                    margin: "auto",
                    borderColor: "white",
                    borderWidth: 1,
                    borderRadius: 10,
                    height: 15,
                    marginTop: 20,
                    overflow: "hidden"
                }}>
                    <View style={{
                        width: `${completedTasksCounterRatio}%`,
                        backgroundColor: "#fcf7d2",
                        height: 15,
                    }}>
                    </View>
                </View>
            </View>
            <View style={{ display: "flex", marginVertical: 20, justifyContent: "center", alignItems: "center", gap: 5, flexDirection: "row", width: "100%", marginBottom: 10 }}>
                <TextInput style={{
                    borderColor: "gray",
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
                    placeholder='Enter your individual task' placeholderTextColor={"gray"}
                />
                <TouchableOpacity
                    onPress={addTaskFunc}
                    style={{
                        backgroundColor: "#fcf7d2",
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
                                height: 400
                            }}>
                                <CircleSlash size={100} color={"white"} />
                                <Text style={{
                                    color: "white",
                                    fontWeight: "600",
                                    fontSize: 18,
                                    textAlign: "center"
                                }}>Search for a project</Text>
                            </View>
                        )
                    }
                }
                style={{}} data={tasks} renderItem={({ item }) => {
                    return (
                        <Task item={item} />
                    )
                }} />
        </ScrollView>
    )
}

export default Home

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