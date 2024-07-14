import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Handshake, Send } from 'lucide-react-native';
import Task from '@/components/Task';
const Home = () => {
    const data = [{
        id: 1,
        title: "lorem Ipsum sdfjk sdfkjsdf ksdjfbsd fkjsd fksdj fksdj fksdj fksjd fkjs dfksdj fkfj ",
        completed: true,
        startsIn: "2023-09-14",
        endsIn: "2023-09-21"
    },
    {
        id: 2,
        title: "Mohamed",
        completed: false,
        startsIn: "2023-09-14",
        endsIn: "2023-09-21"
    },
    {
        id: 3,
        title: "Mohamed",
        completed: false,
        startsIn: "2023-09-14",
        endsIn: "2023-09-21"
    },
    {
        id: 4,
        title: "Mohamed",
        completed: false,
        startsIn: "2023-09-14",
        endsIn: "2023-09-21"
    },
    {
        id: 5,
        title: "Mohamed",
        completed: false,
        startsIn: "2023-09-14",
        endsIn: "2023-09-21"
    },]
    return (
        <View style={style.container}>
            <Text style={{
                marginTop: 60,
                color: "white",
                fontWeight: "bold",
                fontSize: 32
            }}>Nice to see you <Text style={{
                color: "#fcf7d2"
            }}>Abouzaid</Text> <Handshake color={"#fcf7d2"} /></Text>

            <FlatList
                ListHeaderComponent={() => {
                    return (
                        <>
                            <View style={
                                {
                                    width: "100%",
                                    paddingHorizontal: 20,
                                    paddingVertical: 20,
                                    marginTop: 20,
                                    borderWidth: 1,
                                    borderColor: "gray",
                                    borderRadius: 10,
                                }
                            }>
                                <Text style={{
                                    color: "white",
                                    fontWeight: "600",
                                    fontSize: 18
                                }}>Daily<Text style={{
                                    color: "#fcf7d2"
                                }}>Tasks</Text></Text>
                                <View style={{
                                    width: "90%",
                                    margin: "auto",
                                    borderColor: "white",
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    height: 15,
                                    marginTop: 20,
                                    overflow: "hidden"
                                }}>
                                    <View style={{
                                        width: "30%",
                                        backgroundColor: "#fcf7d2",
                                        height: 15,
                                    }}>
                                    </View>
                                </View>
                            </View>
                            <View style={{ display: "flex", marginVertical: 20, justifyContent: "center", alignItems: "center", gap: 5, flexDirection: "row", width: "100%" }}>
                                <TextInput style={{
                                    borderColor: "gray",
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    fontSize: 15,
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    color: "white",
                                    width: "80%"
                                }} placeholder='Enter your individual task' placeholderTextColor={"gray"} />
                                <TouchableOpacity style={{
                                    backgroundColor: "#fcf7d2",
                                    paddingHorizontal: 15,
                                    paddingVertical: 13,
                                    borderRadius: 10,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Send color={"black"} />
                                </TouchableOpacity>
                            </View>
                        </>
                    )
                }}
                style={{}} data={data} renderItem={({ item }) => {
                    return (
                        <Task item={item} />
                    )
                }} />
        </View>
    )
}

export default Home

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191b26',
        paddingTop: 10,
        paddingHorizontal: 20  // center the text horizontally and vertically in the view.
    }
}) 