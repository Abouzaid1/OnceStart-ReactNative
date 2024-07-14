import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Delete } from 'lucide-react-native'
import { TaskType } from '@/types/types'
export default function Task({ item }: { item: TaskType }) {
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
                        }}>Starts In: {item.startsIn}</Text>
                        <Text style={{
                            color: "gray"
                        }}>Starts In: {item.endsIn}</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: "column",
                    gap: 10
                }}>

                    <TouchableOpacity style={{
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
                    <TouchableOpacity style={{
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