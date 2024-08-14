import { View, Text, Image, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PostType } from '@/types/types'
import { uploadsApi } from '@/apis'
import { Heart } from 'lucide-react-native'
import { Dimensions } from 'react-native';
import { usePost } from '@/zustand/post'
import { useAuth } from '@/zustand/auth'
export default function Post({ item }: { item: PostType }) {
    const windowWidth = Dimensions.get('window').width;
    const [isLiked, setIsLiked] = useState(false)
    const { likePost, getPosts } = usePost(state => state)
    const { user } = useAuth(state => state)
    const likeHandler = () => {
        console.log(item.likes)
        likePost(item._id)
        const likedByUser = item.likes.some(like => like.username === user?.username);
        setIsLiked(likedByUser);
    }
    useEffect(() => {
        const likedByUser = item.likes.some(like => like.username === user?.username);
        console.log(likedByUser);
        setIsLiked(likedByUser);
    }, [item.likes, user]);
    return (
        <View style={{
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 20,
            width: "100%",
            marginBottom: 10,

        }}>
            <View style={{
                // borderColor: "gray",
                // borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
                width: "100%",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                backgroundColor: "#2b2e3d"
            }}>
                {
                    item.author.photo && <Image style={{ borderRadius: 10 }} source={{ uri: uploadsApi + item.author.photo }} width={50} height={50} />
                }
                <View>
                    <Text style={{
                        color: "white",
                        fontWeight: "bold"
                    }}>{item.author.username}</Text>
                    <Text style={{
                        color: "white"
                    }}>{item.author.email}</Text>
                </View>
            </View>
            <View style={{
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <View style={{
                    paddingHorizontal: 20,
                }}>
                    <Text style={{
                        fontSize: 22,
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: 20
                    }}>{item.content}</Text>


                </View>

            </View>
            <View style={{
                width: "100%",

            }}>
                <FlatList horizontal={true} style={{ width: "100%" }} data={item.photo} renderItem={({ item }) => {
                    return (
                        <View style={{ width: windowWidth - 60, height: 300, marginRight: 10 }}>
                            <Image source={{ uri: uploadsApi + item }} resizeMode='cover' style={{ width: "100%", borderRadius: 20, height: "100%" }} />
                        </View>
                    )
                }} />

            </View>
            <TouchableOpacity onPress={likeHandler} style={{
                paddingHorizontal: 20,
                paddingTop: 10,
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
            }}>
                {
                    isLiked ? <Heart color={"red"} size={40} /> : <Heart color={"white"} size={40} />
                }
                <Text style={{ color: "white" }}>Number of like: {item.likes.length}</Text>

            </TouchableOpacity>
        </View >
    )
}