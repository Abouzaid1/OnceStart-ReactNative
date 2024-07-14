import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { House, Projector, Search, Settings, List, GroupIcon } from 'lucide-react-native'
export default function layout() {
    return (
        <Tabs screenOptions={{
            tabBarStyle: { backgroundColor: '#191b26', borderWidth: 0, borderColor: '#191b26', paddingBottom: 20, paddingTop: 20, height: 90 },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#888',
            tabBarLabelStyle: { fontSize: 12 },
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