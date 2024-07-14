import { View, Text, TextInput } from 'react-native'
import React from 'react'

const Settings = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#191b26',
            paddingTop: 10,
            paddingHorizontal: 20,
        }}>
            <Text style={{
                marginTop: 60,
                color: "white",
                fontWeight: "bold",
                fontSize: 32
            }}>Setting</Text>
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
                    User Settings
                </Text>
                <Text style={{
                    color: "white",
                    fontSize: 18,
                    marginTop: 20,
                    marginBottom: 10,
                }}>
                    Username
                </Text>
                <TextInput value='Abouzaid' style={{
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
            <View>
                <Text style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 20
                }}>
                    Theme Settings
                </Text>
                <Text style={{
                    color: "white",
                    fontSize: 18,
                    marginTop: 20,
                    marginBottom: 10,
                }}>
                    Background Color
                </Text>
                <TextInput value='#ffffff' style={{
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
                    Background Text
                </Text>
                <TextInput value='#ffffff' style={{
                    borderColor: "#fcf7d2",
                    borderWidth: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    fontSize: 15,
                    borderRadius: 15,
                    color: "#ffffff",
                }}></TextInput>

            </View>
        </View>
    )
}

export default Settings