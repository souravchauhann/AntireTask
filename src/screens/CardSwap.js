import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const { width, height } = Dimensions.get('window');

const initialData = [
  { id: '1', title: 'Card 1', backgroundColor: 'lightblue' },
  { id: '2', title: 'Card 2', backgroundColor: 'lightgreen' },
  { id: '3', title: 'Card 3', backgroundColor: 'lightcoral' },
  { id: '4', title: 'Card 4', backgroundColor: 'lightyellow' },
  { id: '5', title: 'Card 5', backgroundColor: 'lightpink' },
  { id: '6', title: 'Card 6', backgroundColor: 'lightpurple' },
  { id: '7', title: 'Card 7', backgroundColor: 'lightgray' },
  { id: '8', title: 'Card 8', backgroundColor: 'lightcyan' },
  { id: '9', title: 'Card 9', backgroundColor: 'lightgoldenrodyellow' },
  { id: '10', title: 'Card 10', backgroundColor: 'lightseagreen' },
  { id: '11', title: 'Card 11', backgroundColor: 'lightsalmon' },
  { id: '12', title: 'Card 12', backgroundColor: 'lightsteelblue' },
  { id: '13', title: 'Card 13', backgroundColor: 'lightblue' },
  { id: '14', title: 'Card 14', backgroundColor: 'lightgreen' },
  { id: '15', title: 'Card 15', backgroundColor: 'lightcoral' },
  { id: '16', title: 'Card 16', backgroundColor: 'lightyellow' },
  { id: '17', title: 'Card 17', backgroundColor: 'lightpink' },
  { id: '18', title: 'Card 18', backgroundColor: 'lightpurple' },
  { id: '19', title: 'Card 19', backgroundColor: 'lightgray' },
  { id: '20', title: 'Card 20', backgroundColor: 'lightcyan' },
  { id: '21', title: 'Card 21', backgroundColor: 'lightgoldenrodyellow' },
  { id: '22', title: 'Card 22', backgroundColor: 'lightseagreen' },
  { id: '23', title: 'Card 23', backgroundColor: 'lightsalmon' },
  { id: '24', title: 'Card 124', backgroundColor: 'lightsteelblue' },
];

const CardSwap = () => {
  const [cards, setCards] = useState(initialData);
  const [swipedCards, setSwipedCards] = useState([]);
  const [isFirstCardVisible, setIsFirstCardVisible] = useState(false);

  const swiperRef = useRef(null);

  const onSwiped = (direction) => {
    setIsFirstCardVisible(true);
    if (swiperRef.current && swiperRef.current.state && swiperRef.current.state.cards) {
      const currentCard = swiperRef.current.state.cards[0];
      setSwipedCards((prevSwipedCards) => [...prevSwipedCards, currentCard]);
    }
  };

  const onRewind = () => {
    // console.log(">> isFirstCardVisible>>", isFirstCardVisible);
    // console.log(">> swipedCards.length>>", swipedCards);
    // if (swipedCards.length > 0) {
    if(isFirstCardVisible == true){
      const lastSwipedCard = swipedCards[swipedCards.length - 1];
      setCards((prevCards) => [lastSwipedCard, ...prevCards]);
      setSwipedCards((prev) => prev.slice(0, -1));
      setIsFirstCardVisible(false);
    }
      
  };

  const swipeLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeLeft();
      setIsFirstCardVisible(true);

    }
  };

  const swipeRight = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeRight();
      setIsFirstCardVisible(true);

    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width, height: "85%" }}>
        <View style={styles.swiperContainer}>
          <Swiper
            ref={swiperRef}
            cards={cards}
            renderCard={(card) => (
              <View style={[styles.card, { backgroundColor: card?.backgroundColor }]}>
                <Text style={styles.cardTitle}>{card?.title}</Text>
              </View>
            )}
            onSwiped={onSwiped}
            onSwipedLeft={() => onSwiped('left')}
            onSwipedRight={() => onSwiped('right')}
            stackSize={3}
            backgroundColor="transparent"
            overlayLabels={{
              left: {
                title: 'Rejected',
                style: {
                  label: {
                    backgroundColor: 'red',
                    color: 'white',
                    fontSize: 32,
                    fontWeight: 'bold',
                    borderRadius: 10,
                    padding: 20,
                    position: 'absolute',
                    left: 10,
                    top: '40%',
                  },
                },
              },
              right: {
                title: 'Accepted',
                style: {
                  label: {
                    backgroundColor: 'green',
                    color: 'white',
                    fontSize: 32,
                    fontWeight: 'bold',
                    borderRadius: 10,
                    padding: 20,
                    position: 'absolute',
                    right: 10,
                    top: '40%',
                  },
                },
              },
            }}
          />
        </View>
      </View>

      <View style={{ width, height: "15%", position: "absolute", zIndex: 111, bottom: 0, backgroundColor: 'black' }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={swipeLeft}>
            <Text style={styles.buttonText}>Swipe Left</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={swipeRight}>
            <Text style={styles.buttonText}>Swipe Right</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onRewind}>
            <Text style={styles.buttonText}>Rewind</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  card: {
    width: width * 0.9,
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 20,
    position: 'absolute',
    bottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CardSwap;