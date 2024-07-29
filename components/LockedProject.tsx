import { View, Text, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native'
import React from 'react'
import { LockedProjectType, TaskType } from '@/types/types'
import { Lock } from 'lucide-react-native'
export default function LockedProject({ item }: { item: LockedProjectType }) {
    return (
        <TouchableOpacity style={{
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
                }}>Members: {item.members}</Text>
            </View>
        </TouchableOpacity>
    )
}