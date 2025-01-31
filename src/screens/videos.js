import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import Video from 'react-native-video';
import { useFocusEffect } from '@react-navigation/native'; 
import { FONTS } from '../../utlis';

const { height: screenHeight } = Dimensions.get('window');

const data = [
  {
    id: '1',
    image: 'https://www.usatoday.com/gcdn/presto/2023/06/15/USAT/b031760f-26da-42a6-b626-fd20953a2743-SquarelogoPNG.png?crop=2055,2055,x0,y0',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Description for card 1',
  },
  {
    id: '2',
    image: 'https://www.usatoday.com/gcdn/presto/2023/06/15/USAT/b031760f-26da-42a6-b626-fd20953a2743-SquarelogoPNG.png?crop=2055,2055,x0,y0',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Description for card 2',
  },
  {
    id: '3',
    image: 'https://www.usatoday.com/gcdn/presto/2023/06/15/USAT/b031760f-26da-42a6-b626-fd20953a2743-SquarelogoPNG.png?crop=2055,2055,x0,y0',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Description for card 3',
  },
  {
    id: '4',
    image: 'https://www.usatoday.com/gcdn/presto/2023/06/15/USAT/b031760f-26da-42a6-b626-fd20953a2743-SquarelogoPNG.png?crop=2055,2055,x0,y0',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Description for card 4',
  },
  {
    id: '5',
    image: 'https://www.usatoday.com/gcdn/presto/2023/06/15/USAT/b031760f-26da-42a6-b626-fd20953a2743-SquarelogoPNG.png?crop=2055,2055,x0,y0',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Description for card 5',
  },
];

// Card component
const Card = ({ item, isVisible }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Video
        source={{ uri: item.video }}
        style={styles.cardVideo}
        paused={!isVisible} 
        resizeMode="cover"
        repeat
        key={isVisible ? item.id : `${item.id}-paused`} 
      />
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const Videos = () => {
  const [visibleIndices, setVisibleIndices] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setVisibleIndices([]);
      return () => {
        setVisibleIndices([]);
      };
    }, [])
  );

  const handleViewableItemsChanged = ({ viewableItems }) => {
    const indices = viewableItems.map(item => item.index);
    setVisibleIndices(indices);
  };

  const renderItem = ({ item, index }) => {
    const isVisible = visibleIndices.includes(index);
    return <Card item={item} isVisible={isVisible} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated
        barStyle="light-content" 
        backgroundColor="black" 
        translucent 
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 30, 
        }}
        scrollEventThrottle={16} 
      />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'black',
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardVideo: {
    width: '100%',
    height: 200,
  },
  description: {
    padding: 10,
    fontSize: 16,
    color: 'white',
    fontFamily: FONTS.BalooThambiRegular,
  },
});

// Export the main screen component
export default Videos; 