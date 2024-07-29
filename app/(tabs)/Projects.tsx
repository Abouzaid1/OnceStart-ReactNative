import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Handshake, Send } from 'lucide-react-native';
import Task from '@/components/Task';
import Project from '@/components/Project';
import { useProject } from '@/zustand/projectState';
import { Link } from 'expo-router';
const Projects = () => {
    const { getProjects, projects } = useProject(state => state)
    useEffect(() => {
        if (projects.length == 0) {
            getProjects()
        }
    }, [])
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        getProjects()
        setRefreshing(false);
    }, []);
    return (
        <ScrollView style={style.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
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
                    <Link href={"/ProjectPages/CreateProject"}>
                        <Text style={{ fontWeight: "600" }}>Create Project</Text>
                    </Link>
                </TouchableOpacity>
            </View>
            <FlatList style={{}} data={projects}
                scrollEnabled={false}
                renderItem={({ item }) => {
                    return (
                        <Project item={item} />
                    )
                }} />
        </ScrollView >
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