import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Handshake, Send } from 'lucide-react-native';
import Task from '@/components/Task';
import Project from '@/components/Project';
const Projects = () => {

    const data = [{
        id: 1, name: "Design", members: 0, UncompletedTasks: [
            { id: 1, title: "Create wireframes", completed: true, endsIn: "2022-12-15", startsIn: null },
            { id: 2, title: "Design mockups", completed: false, endsIn: "2022-12-20", startsIn: null },
            { id: 3, title: "Finalize design specs", completed: false, endsIn: "2022-12-25", startsIn: null },
        ]
    }, {
        id: 2, name: "Design", members: 0, UncompletedTasks: [
            { id: 1, title: "Create wireframes", completed: true, endsIn: "2022-12-15", startsIn: null },
            { id: 2, title: "Design mockups", completed: false, endsIn: "2022-12-20", startsIn: null },
            { id: 3, title: "Finalize design specs", completed: false, endsIn: "2022-12-25", startsIn: null },
        ]
    }, {
        id: 3, name: "Design", members: 0, UncompletedTasks: [
            { id: 1, title: "Create wireframes", completed: true, endsIn: "2022-12-15", startsIn: null },
            { id: 2, title: "Design mockups", completed: false, endsIn: "2022-12-20", startsIn: null },
            { id: 3, title: "Finalize design specs", completed: false, endsIn: "2022-12-25", startsIn: null },
        ]
    }]
    return (
        <View style={style.container}>
            <Text style={{
                marginTop: 60,
                color: "white",
                fontWeight: "bold",
                fontSize: 32
            }}>Projects</Text>
            <View style={
                {
                    width: "100%",
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    marginTop: 20,
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 10,
                    marginBottom: 10,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }
            }>
                <Text style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 18,

                }}>Enrolled <Text style={{
                    color: "#fcf7d2"
                }}>Projects</Text></Text>
                <TouchableOpacity style={{
                    width: 120,
                    backgroundColor: "#fcf7d2",
                    paddingHorizontal: 2,
                    paddingVertical: 5,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{ fontWeight: "600" }}>Create Project</Text>
                </TouchableOpacity>
            </View>
            <FlatList style={{}} data={data} renderItem={({ item }) => {
                return (
                    <Project item={item} />
                )
            }} />
        </View >
    )
}

export default Projects

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191b26',
        paddingTop: 10,
        paddingHorizontal: 20  // center the text horizontally and vertically in the view.
    }
}) 