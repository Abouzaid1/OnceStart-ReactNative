
import { Stack } from 'expo-router';


export default function RootLayout() {
    return (

        <>
            <Stack>
                <Stack.Screen name="CreateProject" options={{ headerShown: true, title: "Create a Project", headerTintColor: "white", headerStyle: { backgroundColor: "#2A2D40" } }} />
                <Stack.Screen name="[id]" options={{ headerShown: false, title: "Create a Project", headerTintColor: "white", headerStyle: { backgroundColor: "#2A2D40" } }} />
            </Stack>
        </>
    );
}
