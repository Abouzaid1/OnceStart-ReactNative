import { View, Text, ScrollView, RefreshControl, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { DiamondPlusIcon, SearchX } from 'lucide-react-native'
import Post from '@/components/Post'
import { usePost } from '@/zustand/post'
import { useRouter } from 'expo-router'
export default function Posts() {
    const router = useRouter()
    const { posts, getPosts } = usePost()
    useEffect(() => {
        getPosts()
    }, [])
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        getPosts()
        setRefreshing(false);
    };
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            style={style.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 60,

            }}>
                <Text style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 32
                }}>Posts</Text>
                <TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { router.push("/PostPages/CreatePost") }}
                        style={{
                            backgroundColor: "#fcf7d2",
                            paddingHorizontal: 15,
                            paddingVertical: 13,
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        <DiamondPlusIcon color={"black"} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
            <FlatList style={{}} data={posts}
                scrollEnabled={false}
                renderItem={({ item }) => {
                    return (
                        <Post item={item} />
                    )
                }}
                ListEmptyComponent={
                    () => {
                        return (
                            <View style={{
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 50,
                                height: 400
                            }}>
                                <SearchX size={100} color={"white"} />
                                <Text style={{
                                    color: "white",
                                    fontWeight: "600",
                                    fontSize: 18,
                                    textAlign: "center"
                                }}>No posts found</Text>
                            </View>
                        )
                    }
                } />

        </ScrollView>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191b26',
        paddingTop: 10,
        paddingHorizontal: 20  // center the text horizontally and vertically in the view.
    },
    datePicker: {
        backgroundColor: '#191b26',
        width: 300,
        height: 350,
        color: '#fff',
    },
}) 