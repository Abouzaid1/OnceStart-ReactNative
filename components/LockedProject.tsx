import { View, Text, TouchableOpacity, FlatList, TouchableHighlight, TextInput, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { LockedProjectType, TaskType } from '@/types/types'
import { Check, Lock } from 'lucide-react-native'
import { useProject } from '@/zustand/projectState'
import { ActionSheet } from 'react-native-ui-lib'
import { useRouter } from 'expo-router'
export default function LockedProject({ item }: { item: LockedProjectType }) {
    const router = useRouter()
    const { joinProjects, response } = useProject(state => state)
    const [passcode, setPasscode] = useState<string>("")
    const [actionSheet, setActionSheet] = useState<boolean>(false)
    const joinHandler = () => {
        if (passcode != "") {
            joinProjects(item._id, passcode)
        } else {
            Alert.alert("Wait!", "Write the passcode")
        }
    }
    useEffect(() => {
        if (response?.status == 200) {
            router.replace("/Projects")
        }
    }, [response])
    return (
        <>
            <ActionSheet
                onDismiss={() => { setActionSheet(false) }}
                cancelButtonIndex={3}
                destructiveButtonIndex={0}

                renderAction={() => {
                    return (
                        <>
                            <Text style={{
                                marginTop: 20,
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 22
                            }}>Enter the passcode</Text>
                            <View style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                marginTop: 10,
                                justifyContent: "space-between"
                            }}>
                                <TextInput
                                    style={{
                                        width: "80%",
                                        height: 50,
                                        borderColor: 'gray',
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        paddingHorizontal: 10,
                                        color: "white",
                                    }}
                                    placeholder="Ex: 1234"
                                    placeholderTextColor={"gray"}
                                    value={passcode}
                                    onChangeText={(e) => { setPasscode(e) }}
                                />
                                <TouchableOpacity
                                    onPress={joinHandler}
                                    style={{
                                        backgroundColor: "#fcf7d2",
                                        paddingHorizontal: 15,
                                        paddingVertical: 13,
                                        borderRadius: 10,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                    <Check color={"black"} />
                                </TouchableOpacity>
                            </View>
                        </>
                    )
                }}
                containerStyle={{ backgroundColor: "#191b26" }}
                dialogStyle={{
                    padding: 20,
                    marginHorizontal: 10,
                    backgroundColor: "#191b26",
                    height: 300,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    borderWidth: 1,
                    borderColor: "white"
                }}
                options={[
                    { label: '', onPress: () => { } },

                ]} visible={actionSheet} />
            <TouchableOpacity onPress={() => { setActionSheet(true) }} style={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 30,
                width: "100%",
                marginBottom: 10,
            }}>
                <View style={{
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: 22,
                        color: "white",
                        maxWidth: "80%",
                        fontWeight: "bold"
                    }}> <Lock color={"white"} /> {item.name}</Text>
                    <Text style={{
                        fontSize: 20,
                        color: "white",
                        maxWidth: "80%",
                    }}>Members: {item.members.length}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}