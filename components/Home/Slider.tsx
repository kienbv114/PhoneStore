import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../components/context/AuthContext';
import { router } from 'expo-router';

interface SlideItem {
  id: string;
  image: any;
}

const Slider: React.FC = () => {
  const { user } = useAuth();
  const [slideList, setSlideList] = useState<SlideItem[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const localSliders: SlideItem[] = [
      { id: '1', image: require('../../assets/images/slider1.jpg') },
      { id: '2', image: require('../../assets/images/slider2.jpg') },
      { id: '3', image: require('../../assets/images/slider3.jpg') },
      { id: '4', image: require('../../assets/images/slider4.jpg') },
      { id: '5', image: require('../../assets/images/slider5.jpg') },
      { id: '6', image: require('../../assets/images/slider6.jpg') },
    ];
    setSlideList(localSliders);
  }, []);

  useEffect(() => {
    if (slideList.length === 0) return;
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slideList.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, slideList]);

  const renderItem = ({ item }: { item: SlideItem }) => (
    <View style={styles.slideContainer}>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  const handleLogoPress = () => {
    router.push('/(tabs)/profile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleLogoPress}>
          <Image
            source={require('../../assets/images/logo1.jpg')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>#Special for you</Text>
          {user && <Text style={styles.username}>Xin chào, {user.username}</Text>}
        </View>
      </View>
      <View style={styles.sliderBackground}>
        <FlatList
          ref={flatListRef}
          data={slideList}
          horizontal
          style={styles.flatList}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 200));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: 'contain',
    borderRadius:99
  },
  title: {
    fontFamily: 'outfit',
    fontSize: 20,
    color: '#FF9671',
  },
  username: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#333',
    marginTop: 2,
  },
  sliderBackground: {
    backgroundColor: '#FF9671',
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  flatList: {
    paddingLeft: 10,
  },
  slideContainer: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: 300,
    height: 160,
    resizeMode: 'cover',
    borderRadius: 15,
    marginRight: 15,
  },
});

export default Slider;