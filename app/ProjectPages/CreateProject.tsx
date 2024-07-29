import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { useProject } from '@/zustand/projectState';
import { Link, useRouter } from 'expo-router';
export default function CreateProject() {
    const route = useRouter()
    const { createProject } = useProject(state => state)
    const Colors = [
        { title: 'White', color: 'white' },
        { title: 'Red', color: 'red' },
        { title: 'Orange', color: 'orange' },
        { title: 'Green', color: 'green' },
        { title: 'Yellow', color: 'yellow' },
        { title: 'Pink', color: 'pink' },
    ];
    const [projectname, setProjectname] = useState("")
    const [projectColor, setProjectColor] = useState("")
    const [projectPasscode, setProjectPasscode] = useState("")
    const createProjectFunction = () => {
        console.log(projectname, projectColor, projectPasscode)
        if (projectname !== "" || projectColor !== "" || projectPasscode !== "") {
            createProject(projectname, projectPasscode, projectColor)
        }
        route.back()
    }
    return (
        <View style={style.containerChild}>

            <TextInput value={projectname} onChangeText={(e) => { setProjectname(e) }} placeholder='Project Name' placeholderTextColor={"gray"} style={style.input} />
            {/* <TextInput placeholder='Project Main color' placeholderTextColor={"gray"} style={style.input} /> */}
            <SelectDropdown
                data={Colors}
                onSelect={(selectedItem, index) => {
                    setProjectColor(selectedItem.color)
                }}
                renderButton={(selectedItem, isOpened) => {
                    return (
                        <View style={style.dropdownButtonStyle}>
                            {selectedItem ?
                                <Text style={{ color: "#ffffff", fontSize: 18, textAlign: "left" }}>{selectedItem.title}</Text> :
                                <Text style={style.dropdownButtonTxtStyle}>
                                    Select your Color
                                </Text>
                            }
                            {
                                isOpened ? <ChevronUp size={16} color={"white"} /> : <ChevronDown size={16} color={"white"} />
                            }
                        </View>
                    );
                }}
                renderItem={(item, index, isSelected) => {
                    return (
                        <View style={{ ...style.dropdownItemStyle, ...(isSelected && { backgroundColor: '#191b26' }) }}>
                            <Text style={{ color: "#ffffff", fontSize: 18, textAlign: "left" }}>{item.title}</Text>
                        </View>
                    );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={style.dropdownMenuStyle}
            />
            <TextInput value={projectPasscode} onChangeText={(e) => { setProjectPasscode(e) }} placeholder='Passcode' placeholderTextColor={"gray"} style={style.input} />
            <Text style={{
                color: "white",
                textAlign: "left",
                width: "100%",
            }}> - Project passcode used to invite peaple</Text>
            <TouchableOpacity onPress={createProjectFunction} style={style.btn}>
                <Text style={{ color: "#ffffff", fontSize: 20 }}>Create Project</Text>
            </TouchableOpacity>
        </View>
    )
}
const style = StyleSheet.create({
    containerChild: {
        backgroundColor: '#191b26',
        flex: 1,
        height: "100%",
        width: "100%", // center the text vertically in the view.
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20  // center the text horizontally and vertically in the view.
    },
    dropdownButtonStyle: {
        marginHorizontal: 10,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: "#fcf7d2",
        borderWidth: 1,
        marginTop: 40,
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 20,
        borderRadius: 10,
        color: "#ffffff",
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: 'gray',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#191b26',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 8,
        color: '#ffffff',
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#ffffff',
    },

    input: {
        marginHorizontal: 10,
        width: "100%",
        borderColor: "#fcf7d2",
        borderWidth: 1,
        marginTop: 40,
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 20,
        borderRadius: 10,
        color: "#ffffff",
    },
    btn: {
        marginHorizontal: 10,
        borderColor: "#fcf7d2",
        width: "100%",
        borderWidth: 1,
        marginTop: 40,
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
}) 