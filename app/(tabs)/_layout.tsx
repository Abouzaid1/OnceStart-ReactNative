import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Tabs } from 'expo-router'
import { House, Projector, Search, Settings, List, GroupIcon } from 'lucide-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
export default function layout() {
    const route = useRouter()
    const checkSignIn = async () => {
        const me = await AsyncStorage.getItem('me');
        if (me == null) {
            route.push('/login');
        }
    }
    checkSignIn()
    return (
        <Tabs screenOptions={{
            tabBarStyle: { backgroundColor: '#191b26', borderWidth: 0, borderColor: '#191b26', paddingBottom: 20, paddingTop: 20, height: 90 },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#888',
            tabBarLabelStyle: { fontSize: 12 },
            tabBarHideOnKeyboard: true,
        }}>
            <Tabs.Screen
                name='Home' options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <List color={focused ? "white" : "gray"} />
                        )
                    }
                }} />
            <Tabs.Screen name='Projects' options={{
                headerShown: false, tabBarIcon: ({ focused }) => {
                    return (
                        <GroupIcon color={focused ? "white" : "gray"} />
                    )
                }
            }} />
            <Tabs.Screen name='SearchForProject' options={{
                headerShown: false, title: "Search", tabBarIcon: ({ focused }) => {
                    return (
                        <Search color={focused ? "white" : "gray"} />
                    )
                }
            }} />
            <Tabs.Screen name='Settings' options={{
                headerShown: false, tabBarIcon: ({ focused }) => {
                    return (
                        <Settings color={focused ? "white" : "gray"} />
                    )
                }
            }} />
        </Tabs>

    )
}