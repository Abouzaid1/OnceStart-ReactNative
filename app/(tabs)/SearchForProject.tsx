import { View, FlatList, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import LockedProject from '@/components/LockedProject'
import { Search, SearchX, Check, Loader, CircleSlash } from 'lucide-react-native'
import { api } from '@/apis'
import axios from 'axios'
import { useAuth } from '@/zustand/auth'
import { LockedProjectType } from '@/types/types'
import { useProject } from '@/zustand/projectState'
import { ActionSheet } from 'react-native-ui-lib'
const SearchForProject = () => {

    const [searchQuery, setSearchQuery] = useState<string>("")
    const [projectsFound, setProjectFound] = useState<LockedProjectType[]>()
    const { user } = useAuth(state => state)

    const searchHandler = () => {
        if (searchQuery != "") {
            axios.get(api + `/projects/search?search=${searchQuery}`, { headers: { 'Authorization': user?.token } })
                .then(response => setProjectFound(response.data.projects))
                .catch(e => {
                    Alert.alert("Wait!", e.response.data.message)
                })
        }
    }
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
                            width: "80%",
                            height: 50,
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
                    <TouchableOpacity
                        onPress={searchHandler}
                        style={{
                            backgroundColor: "#fcf7d2",
                            paddingHorizontal: 15,
                            paddingVertical: 13,
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        <Search color={"black"} />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList style={{}} data={projectsFound}
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
                renderItem={({ item }) => {
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