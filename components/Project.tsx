import { View, Text, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native'
import React from 'react'
import { TaskType } from '@/types/types'
import { ProjectType } from '@/types/types'
export default function Project({ item }: { item: ProjectType }) {
    return (
        <TouchableOpacity style={{
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 30,
            paddingVertical: 30,
            paddingBottom: 10,
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
                }}>{item.name}</Text>
                <Text style={{
                    fontSize: 20,
                    color: "white",
                    maxWidth: "80%",
                }}>Members: {item.members}</Text>
            </View>
            <Text style={{
                fontSize: 15,
                color: "white",
                marginBottom: 10,
                fontWeight: "bold"
            }}>Uncompleted Tasks:</Text>
            <FlatList data={item.UncompletedTasks} renderItem={({ item }) => {
                return (
                    <View style={{
                        borderColor: "gray",
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 10,

                        width: "100%",
                        marginBottom: 10,

                    }}>
                        <Text style={{ color: "white", }}>{item.title}</Text>
                        <Text style={{ color: "gray", }}>{item.endsIn}</Text>
                    </View>
                )
            }} />
        </TouchableOpacity>
    )
}