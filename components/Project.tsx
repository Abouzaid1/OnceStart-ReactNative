import { View, Text, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native'
import React from 'react'
import { MainProjectType, TaskType } from '@/types/types'
import { useRouter } from 'expo-router'
export default function Project({ item }: { item: MainProjectType }) {
    const route = useRouter()
    const handleRoute = (item: string) => {
        route.push(`/ProjectPages/${item}`)
    }
    return (
        <TouchableOpacity onPress={() => { handleRoute(item._id) }} style={{
            borderColor: `${item.color}`,
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
                    color: `${item.color}`,
                    maxWidth: "80%",
                    fontWeight: "bold"
                }}>{item.name}</Text>
                <Text style={{
                    fontSize: 20,
                    color: `${item.color}`,
                    maxWidth: "80%",
                }}>Members: {item.members.length}</Text>
            </View>
            <Text style={{
                fontSize: 15,
                color: `${item.color}`,
                marginBottom: 10,
                fontWeight: "bold"
            }}>Creator: {item.leader.username}</Text>
            {/* <FlatList data={item.UncompletedTasks} renderItem={({ item }) => {
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
                        <Text style={{ color: "white" }}>{item.title}</Text>
                        <Text style={{ color: "gray" }}>{item.endsIn}</Text>
                    </View>
                )
            }} /> */}
        </TouchableOpacity>
    )
}