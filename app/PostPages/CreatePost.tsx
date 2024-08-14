import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native'
import React, { useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { useProject } from '@/zustand/projectState';
import { Link, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native'
import { usePost } from '@/zustand/post';
import { PostType } from '@/types/types';
export default function CreatePost() {
    const route = useRouter()
    const [content, setContent] = useState<string>("")
    const [photo, setPhoto] = useState<any>();
    const { addPost, getPosts } = usePost()
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setPhoto(result.assets);
            console.log(photo);

        }
    };
    const addPostHandler = () => {
        if (content != "") {
            addPost(content, photo)
        } else (
            Alert.alert("Error", "Please fill all fields")
        )
        getPosts()
        route.back();
    }
    return (
        <View style={style.containerChild}>


            {/* <TextInput placeholder='Project Main color' placeholderTextColor={"gray"} style={style.input} /> */}

            <TextInput value={content} onChangeText={(e) => { setContent(e) }} placeholder='Content' placeholderTextColor={"gray"} style={{
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
            }} />
            <TouchableOpacity
                style={{ width: '100%' }}
                onPress={pickImage}>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 50,
                    height: photo ? 300 : 100,
                    alignItems: "center",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#fcf7d2",
                    width: "100%",
                }}>
                    {photo ? <FlatList horizontal={true} data={photo} renderItem={({ item }) => {
                        return (
                            <Image source={{ uri: item.uri }} resizeMode='contain' style={{ minWidth: 250, minHeight: 300 }} />
                        )
                    }} /> : <Text style={{
                        color: "white",
                    }}>Upload a profile Photo</Text>}

                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={addPostHandler} style={style.btn}>
                <Text style={{ color: "#ffffff", fontSize: 20 }}>Create Post</Text>
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