import { View, Text, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function Slider() {
    const [slideList, setSliderList] = useState([]);
    useEffect(() => {
        const fakeSliders = [
            { id: '1', imageUrl: 'https://cdn.tgdd.vn/Files/2021/09/11/1381799/samsung_z_slide_1280x720-800-resize.jpg' },
            { id: '2', imageUrl: 'https://cdn.tgdd.vn/Files/2021/09/11/1381799/samsung_galaxy_slide_1280x720-800-resize.jpg' },
            { id: '3', imageUrl: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/10/cach-dat-hinh-nen-iphone-tam-thumb.jpg' }
        ];
        setSliderList(fakeSliders);
    }, []);

    return (
        <View style={{ backgroundColor: '#f5f5f5', paddingBottom: 20 }}>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 24,
                fontWeight: 'bold',
                color: '#333',
                padding: 20,
                textAlign: 'center',
                marginBottom: 15
            }}>
                #Special for You
            </Text>
            <FlatList
                data={slideList}
                horizontal={true}
                style={{ paddingLeft: 10, paddingRight: 10 }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Image source={{ uri: item.imageUrl }}
                        style={{
                            width: 300,
                            height: 180,
                            resizeMode: 'cover',
                            borderRadius: 15,
                            marginRight: 20,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.5,
                            elevation: 5
                        }}
                    />
                )}
            />
        </View>
    );
}
