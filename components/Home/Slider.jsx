import { View, Text, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function Slider() {
    const [slideList, setSliderList] = useState([]);
    useEffect(() => {
        const fakeSliders = [
            { id: '1', imageUrl: 'https://source.unsplash.com/300x160/?phone' },
            { id: '2', imageUrl: 'https://source.unsplash.com/300x160/?electronics' },
            { id: '3', imageUrl: 'https://source.unsplash.com/300x160/?gadget' }
        ];
        setSliderList(fakeSliders);
    }, []);

    return (
        <View>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 20,
                padding: 20
            }}>
                #Special for you
            </Text>
            <FlatList
                data={slideList}
                horizontal={true}
                style={{ paddingLeft: 20 }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Image source={{ uri: item.imageUrl }}
                        style={{
                            width: 300,
                            height: 160,
                            resizeMode: 'cover',
                            borderRadius: 15,
                            marginRight: 15
                        }}
                    />
                )}
            />
        </View>
    );
}
