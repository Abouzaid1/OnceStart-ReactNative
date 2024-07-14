import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
export default function layout() {
    return (
        <Tabs screenOptions={{
            tabBarStyle: { display: 'none' },
        }}>
            <Tabs.Screen name='login' options={{ headerShown: false }} />
            <Tabs.Screen name='signup' options={{ headerShown: false }} />
        </Tabs>

    )
}