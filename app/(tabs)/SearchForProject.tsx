import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { TaskType } from '@/types/types'
import LockedProject from '@/components/LockedProject'
import { LockedProjectType } from '@/types/types'
const SearchForProject = () => {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [filteredData, setFilteredData] = useState<LockedProjectType[]>()
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
    },
    {
        id: 4, name: "Project", members: 0, UncompletedTasks: [
            { id: 1, title: "Create wireframes", completed: true, endsIn: "2022-12-15", startsIn: null },
            { id: 2, title: "Design mockups", completed: false, endsIn: "2022-12-20", startsIn: null },
            { id: 3, title: "Finalize design specs", completed: false, endsIn: "2022-12-25", startsIn: null },
        ]
    },]
    useEffect(() => {
        const filtered: LockedProjectType[] = data.filter(project => project.name.toLowerCase().includes(searchQuery.toLowerCase()))
        if (filtered != undefined) {
            setFilteredData(filtered)
        }
    }, [searchQuery])
    return (
        <View style={style.container}>
            <Text style={{
                marginTop: 60,
                color: "white",
                fontWeight: "bold",
                fontSize: 32
            }}>Search</Text>
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
                }
            }>
                <Text style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 18,

                }}>Seatch for a <Text style={{
                    color: "#fcf7d2"
                }}>Projects</Text></Text>

                <View style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: 10,
                    justifyContent: "space-between"
                }}>
                    <TextInput
                        style={{
                            width: "100%",
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            color: "white",
                        }}
                        value={searchQuery}
                        onChangeText={(e) => { setSearchQuery(e) }}
                        placeholder="Search for a project"
                        placeholderTextColor={"gray"}
                    />

                </View>
            </View>
            <FlatList style={{}} data={filteredData ? filteredData : data} renderItem={({ item }) => {
                return (

                    <LockedProject item={item} />
                )
            }} />
        </View >
    )
}

export default SearchForProject

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191b26',
        paddingTop: 10,
        paddingHorizontal: 20  // center the text horizontally and vertically in the view.
    }
}) 