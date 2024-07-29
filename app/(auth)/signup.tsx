import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { useAuth } from '@/zustand/auth'
import { useRouter } from 'expo-router'
export default function signup() {
    const route = useRouter()
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [repeatedPassword, setRepeatedPassword] = useState<string>("")
    const response = useAuth(state => state.response)
    const err = useAuth(state => state.err)
    const signUp = useAuth(state => state.signUp)
    const sendData = () => {
        if (username != "" || email != "" || password != "" || repeatedPassword != "") {
            console.log("test1");

            if (password === repeatedPassword) {
                console.log("test2");
                signUp(username, email, password)
            }
        }
    }
    useEffect(() => {
        if (err != null) {
            console.log(err);
            Alert.alert("Error", err)
        }
    }, [err])
    useEffect(() => {
        console.log(response)
        if (response?.status === 201) {
            route.push("/login")
            return;
        }
    }, [response])
    return (
        <ScrollView style={style.container}>
            <Text style={style.welcome}>Welcome to Once$tart</Text>
            <Text style={style.login}>SignUp</Text>
            <TextInput onChangeText={(e) => { setEmail(e) }} value={email} placeholder='Email' placeholderTextColor={"gray"} style={style.input} />
            <TextInput onChangeText={(e) => { setUsername(e) }} value={username} placeholder='username' placeholderTextColor={"gray"} style={style.input} />
            <TextInput onChangeText={(e) => { setPassword(e) }} value={password} placeholder='password' placeholderTextColor={"gray"} style={style.input} />
            <TextInput onChangeText={(e) => { setRepeatedPassword(e) }} value={repeatedPassword} placeholder='repeat password' placeholderTextColor={"gray"} style={style.input} />
            <TouchableOpacity onPress={sendData} style={style.btn}>
                <Text style={{ color: "#ffffff", fontSize: 20 }}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.btn}>
                <Link href={"/login"}>
                    <Text style={{ color: "#ffffff", fontSize: 20 }}>Login</Text>
                </Link>
            </TouchableOpacity>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#191b26",
        flex: 1,
        paddingBottom: 200,
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
    }
})