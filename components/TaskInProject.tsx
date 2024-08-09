import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Delete } from 'lucide-react-native'
import { TaskInProjectType, TaskType } from '@/types/types'
import { useTask } from '@/zustand/taskState'
import { Image } from 'react-native'
import { uploadsApi } from '@/apis'
export default function TaskInProject({ item }: { item: TaskInProjectType }) {
    const deleteTask = useTask(state => state.deleteTask)
    const editTask = useTask(state => state.editTask)
    const formatDate = (dateString: any) => {
        return new Date(dateString).toLocaleDateString(undefined);
    };
    const deleteFunc = (id: string) => {
        deleteTask(id)
    }
    const checkFunc = (id: string, edit: any) => {
        editTask(id, edit)
    }
    return (
        <View style={{
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 20,
            width: "100%",
            marginBottom: 10,

        }}>
            <View style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
                width: "100%",
                flexDirection: "row",
                gap: 10,
                alignItems: "center"
            }}>
                {
                    item.userCreated.photo && <Image style={{ borderRadius: 10 }} source={{ uri: uploadsApi + item.userCreated.photo }} width={50} height={50} />
                }
                <View>
                    <Text style={{
                        color: "white"
                    }}>{item.userCreated.username}</Text>
                    <Text style={{
                        color: "white"
                    }}>{item.userCreated.email}</Text>
                </View>
            </View>
            <View style={{
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <View>
                    <Text style={{
                        fontSize: 17,
                        color: "white",
                        maxWidth: "85%",
                        minWidth: "85%",
                        fontWeight: "bold"
                    }}>{item.title}</Text>
                    <View style={{
                        width: "100%",
                        marginTop: 10
                    }}>
                        <Text style={{
                            color: "gray"
                        }}>Created at: {formatDate(item.createdAt)}</Text>
                        <Text style={{
                            color: "gray"
                        }}>Starts In: {item.startsIn ? formatDate(item.startsIn) : "Not set"}</Text>
                        <Text style={{
                            color: "gray"
                        }}>Ends In: {item.endsIn ? formatDate(item.endsIn) : "Not set"}</Text>
                        {/* <Text style={{
                            color: "gray"
                        }}>Creator name: {item.userCreated.username}</Text>
                        <Text style={{
                            color: "gray"
                        }}>Creator name: {item.userCreated.email}</Text> */}
                    </View>
                </View>
                <View style={{
                    flexDirection: "column",
                    gap: 10
                }}>

                    <TouchableOpacity
                        onPress={() => { checkFunc(item._id, { completed: !item.completed }) }}
                        style={{
                            marginRight: 10,
                            width: 40,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                            borderColor: "#fcf7d2",
                            borderWidth: 1,
                            backgroundColor: item.completed ? "#fcf7d2" : "transparent"
                        }}>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { deleteFunc(item._id) }}
                        style={{
                            marginRight: 10,
                            width: 40,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Delete color={"#fcf7d2"}></Delete>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}