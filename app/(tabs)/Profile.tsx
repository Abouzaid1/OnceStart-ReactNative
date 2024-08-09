import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { LogOut } from 'lucide-react-native'
import { useAuth } from '@/zustand/auth'
import { useRouter } from 'expo-router'
const Profile = () => {
    const { logout, user } = useAuth(state => state)

    const route = useRouter()
    const logoutFunc = () => {
        logout()
        route.dismissAll()
        route.replace('/(auth)/login');
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#191b26',
            paddingTop: 10,
            paddingHorizontal: 20,
        }}>
            <View style={{
                marginTop: 60,
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
            }}>
                <Text style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 32
                }}>Profile</Text>
                <TouchableOpacity onPress={logoutFunc}>

                    <LogOut size={35} color={"red"} />
                </TouchableOpacity>
            </View>
            <View style={{
                width: "100%",
                height: 1,
                backgroundColor: "white",
                marginVertical: 20
            }}>

            </View>
            <View>
                <Text style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 20
                }}>
                    User Info
                </Text>
                <Text style={{
                    color: "white",
                    fontSize: 18,
                    marginTop: 20,
                    marginBottom: 10,
                }}>
                    Username
                </Text>
                <TextInput value={user?.username}
                    editable={false} style={{
                        borderColor: "#fcf7d2",
                        borderWidth: 1,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        fontSize: 15,
                        borderRadius: 15,
                        color: "#ffffff",
                    }}></TextInput>
                <Text style={{
                    color: "white",
                    fontSize: 18,
                    marginTop: 20,
                    marginBottom: 10,
                }}>
                    Email
                </Text>
                <TextInput
                    editable={false}
                    value={user?.email} style={{
                        borderColor: "#fcf7d2",
                        borderWidth: 1,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        fontSize: 15,
                        borderRadius: 15,
                        color: "#ffffff",
                    }}></TextInput>

            </View>
            <View style={{
                width: "100%",
                height: 1,
                backgroundColor: "white",
                marginVertical: 20
            }}>

            </View>

        </View>
    )
}

export default Profile