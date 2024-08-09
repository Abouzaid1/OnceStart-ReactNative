import { View, Text } from 'react-native'
import React from 'react'
import { PostType } from '@/types/types'

export default function Post({ item }: { item: PostType }) {
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
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
                width: "100%",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                backgroundColor: "#2b2e3d"
            }}>
                {/* {
                  item.userCreated.photo && <Image style={{ borderRadius: 10 }} source={{ uri: uploadsApi + item.userCreated.photo }} width={50} height={50} />
              } */}
                <View>
                    <Text style={{
                        color: "white",
                        fontWeight: "bold"
                    }}>Abouzaid</Text>
                    <Text style={{
                        color: "white"
                    }}>Ahmed@mail.com</Text>
                </View>
            </View>
            <View style={{
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <View>
                    <Text style={{
                        fontSize: 22,
                        color: "white",
                        maxWidth: "85%",
                        minWidth: "85%",
                        fontWeight: "bold"
                    }}>Hello Post</Text>
                    <Text style={{
                        fontSize: 15,
                        color: "white",

                    }}>Lorem askjdf dakjsda kjaf ksdj fksjd dfksjd dfjksd fkjs dfk sdkf ksdj vkjsdkfjdd</Text>
                    {/* {
                  item.userCreated.photo && <Image style={{ borderRadius: 10 }} source={{ uri: uploadsApi + item.userCreated.photo }} width={50} height={50} />
              } */}
                </View>

            </View>
        </View>
    )
}