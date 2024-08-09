import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { useAuth } from '@/zustand/auth'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function login() {
    const route = useRouter()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const loginFunc = useAuth(state => state.login)
    const response = useAuth(state => state.response)
    const err = useAuth(state => state.err)
    const getUserFromStorage = useAuth(state => state.getUserFromStorage)
    const user = useAuth(state => state.user)
    const checkSignIn = async () => {
        const jsonValue = await AsyncStorage.getItem('me');
        const me = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log(me);

        if (me != null) {
            getUserFromStorage(me)
            console.log(me);
            route.push('/(tabs)/Home');
        }
    }
    useEffect(() => {
        checkSignIn()
    }, [])
    const sendData = async () => {
        if (username != "" || password != "") {
            loginFunc(username, password)

        } else {
            Alert.alert("Error", "You must provide a username and password")
        }
    }
    useEffect(() => {
        if (err != null) {
            Alert.alert("Error", err)
        }
    }, [err])
    useEffect(() => {
        if (response?.status === 200) {
            route.push("/(tabs)/Home")
        }
    }, [response])
    return (
        <ScrollView style={style.container}>
            <Text style={style.welcome}>Welcome to Once$tart</Text>
            <Text style={style.login}>Login</Text>
            <TextInput onChangeText={(e) => { setUsername(e) }} value={username} placeholder='username' placeholderTextColor={"gray"} style={style.input} />
            <TextInput onChangeText={(e) => { setPassword(e) }} value={password} placeholder='password' placeholderTextColor={"gray"} style={style.input} />
            <TouchableOpacity onPress={sendData} style={style.btn}>
                {/* <Link href={"/Home"}> */}
                <Text style={{ color: "#ffffff", fontSize: 20 }}>Login</Text>
                {/* </Link> */}
            </TouchableOpacity>
            <TouchableOpacity style={style.btnreverse} onPress={() => { }}>
                <Link href={"/signup"}>
                    <Text style={{ color: "#ffffff", fontSize: 20 }}>Signup</Text>
                </Link>
            </TouchableOpacity>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#191b26",
        flex: 1,
        paddingBottom: 100,
    },
    login: {
        paddingHorizontal: 40,
        fontSize: 30,
        color: "#ffffff",
        marginTop: 50,
    },
    welcome: {
        paddingHorizontal: 40,
        textAlign: "center",
        fontSize: 40,
        color: "#ffffff",
        marginTop: 100,
    },
    input: {
        marginHorizontal: 40,
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
        marginHorizontal: 40,
        borderColor: "#fcf7d2",
        borderWidth: 1,
        marginTop: 40,
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    btnreverse: {
        marginHorizontal: 40,
        borderColor: "#fcf7d2",
        borderWidth: 1,
        marginTop: 20,
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    }
})