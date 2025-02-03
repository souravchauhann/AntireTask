import React,{useState} from 'react';
import { Animated, FlatList, Image, Pressable, StatusBar, StyleSheet, Text, View, useWindowDimensions, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { FONTS, IMAGES } from '../../utlis';

const { width, height } = Dimensions.get('window');
var urrentValue=true
const FirstRoute = () => {
  const items = Array.from({ length: 5 }, (_, index) => `Item ${index + 1}`);
  const [isFirstItemVisible, setIsFirstItemVisible] = useState(false);

  // Create a ref for the viewability config
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // Item is considered visible if 50% of it is visible
  };

  // Callback to handle viewable items
  const onViewableItemsChanged = ({ viewableItems }) => {
    const firstItemVisible = viewableItems.some(item => item.index === 0);
    console.log(">>>",firstItemVisible)
    if(firstItemVisible == true){
      // setIsScrollEnabled(true)
      // setIsFlatlistScroll(false)
    }
    setIsFirstItemVisible(firstItemVisible);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <Text style={{ padding: 20, fontSize: 18, color: '#fff' }}>
            {item}
          </Text>
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Text style={{ padding: 20, fontSize: 18, color: '#fff' }}>
        Is the first item visible? {isFirstItemVisible ? 'Yes' : 'No'}
      </Text>
    </View>
  );
};

const SecondRoute = () => (
  <ScrollView style={{ flex: 1, backgroundColor: '#673ab7' }}>
    <Text style={{ padding: 20, fontSize: 18, color: '#fff' }}>Second Tab Content</Text>
  </ScrollView>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const routes = [
  { key: 'first', title: 'First' },
  { key: 'second', title: 'Second' },
];

const Feeds = () => {
const [isFlatlistScroll,setIsFlatlistScroll]=useState(false)

  const [isAtBottom, setIsAtBottom] = useState(false);

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [isScrollEnabled, setIsScrollEnabled] = React.useState(true); // Controls outer ScrollView scrollability

  const onFlatListScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    
    // When user scrolls to the top of the FlatList, enable outer ScrollView scrolling
    if (contentOffsetY <= 0) {
      setIsScrollEnabled(true);
    } else {
      setIsScrollEnabled(false); // Disable outer ScrollView when FlatList is scrolling
    }
  };



  const handleScrolling = (event) => {
    // Scroll position (distance scrolled vertically)
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    
    // Content height
    const contentHeight = event.nativeEvent.contentSize.height;

    // Check if the user has reached the bottom
    if (contentOffsetY + height >= contentHeight) {
      if (!isAtBottom) {
        console.log("Reached the bottom of the ScrollView");
        setIsAtBottom(true);  
        // setIsScrollEnabled(false)
        setIsFlatlistScroll(true)
      }
    } else {
      if (isAtBottom) {
        console.log("User is no longer at the bottom");
        setIsAtBottom(false); 
        // setIsScrollEnabled(true)
        setIsFlatlistScroll(false)


      }
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated
        barStyle="light-content"
        backgroundColor="black"
        translucent
      />
      <ScrollView 
      onScroll={handleScrolling}
        contentContainerStyle={styles.scrollContainer} 
        scrollEnabled={isScrollEnabled} // Outer ScrollView scroll enabled based on FlatList's position
      >
        <View style={styles.headerContainer}>
          <Image
            style={styles.leftArrow}
            source={IMAGES.LeftArrow}
          />
          <Text style={styles.usernameText}>User _name</Text>
          <Image
            style={styles.menuIcon}
            source={IMAGES.WhiteMenu}
          />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            />
          </View>
          <View style={styles.statsDetailsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>129</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3680</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>230</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>Name</Text>
          <Text style={styles.businessText}>Local business</Text>
          <Text style={styles.websiteText}>www.website.com</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.followButton}>
            <Text style={styles.buttonText}>Follow</Text>
          </Pressable>
          <Pressable style={styles.messageButton}>
            <Text style={styles.buttonText}>Message</Text>
          </Pressable>
          <Pressable style={styles.emailButton}>
            <Text style={styles.buttonText}>Email</Text>
          </Pressable>
          <Pressable style={styles.arrowButton}>
            <Image
              style={styles.arrowIcon}
              source={IMAGES.DownArrow}
            />
          </Pressable>
        </View>

        <View style={{ marginHorizontal: 10, borderWidth: 0, borderColor: 'white', marginTop: '6%', marginHorizontal: 20 }}>
          <FlatList
          scrollEnabled={isFlatlistScroll}
            bounces={false}
            horizontal
            renderItem={({ item }) => (
              <View>
                <View style={{
                  height: 65, width: 65, borderRadius: 100, borderWidth: 1, borderColor: "white", marginRight: 18,
                  borderColor: '#7e7e7e', justifyContent: 'center', alignItems: 'center'
                }}>
                  <View style={{ backgroundColor: "#146799", height: 58, width: 58, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontFamily: FONTS.BalooThambiSemiBold, fontSize: 24 }}>{item}</Text>
                  </View>
                </View>
                <Text style={{ color: 'white' }}>HighLight</Text>
              </View>
            )}
            data={[1, 2, 3, 4]}
            onScroll={onFlatListScroll} // Handle scroll on FlatList to enable or disable outer ScrollView
          />
        </View>

        {/* TabView section */}
        <View style={{ flex: 1, height: height }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: 'white' }}
                style={{ backgroundColor: "#141414" }}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feeds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414"
  },
  scrollContainer: {
    paddingBottom: 20, // Add some space at the bottom for scrollability
  },
  headerContainer: {
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'white',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18
  },
  leftArrow: {
    height: 30,
    width: 20,
    marginLeft: 5
  },
  usernameText: {
    color: 'white',
    fontFamily: FONTS.BalooThambiSemiBold,
    fontSize: 20
  },
  menuIcon: {
    height: 15,
    width: 17
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between', marginTop: 8
  },
  profileImageContainer: {
    borderWidth: 0,
    borderColor: 'white',
    width: '25%'
  },
  profileImage: {
    height: 90,
    width: 90,
    borderRadius: 100
  },
  statsDetailsContainer: {
    borderWidth: 0,
    borderColor: 'white',
    width: '71%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statItem: {
    borderWidth: 0,
    borderColor: 'white',
    width: "30%",
    alignItems: 'center'
  },
  statNumber: {
    color: 'white',
    fontFamily: FONTS.BalooThambiSemiBold,
    fontSize: 20,
    lineHeight: 22
  },
  statLabel: {
    color: 'white',
    fontFamily: FONTS.BalooThambiRegular,
    fontSize: 17,
    marginTop: -8
  },
  infoContainer: {
    borderWidth: 0,
    borderColor: 'white',
    marginHorizontal: 20,
    marginTop: "5%"
  },
  nameText: {
    color: 'white',
    fontFamily: FONTS.BalooThambiSemiBold,
    fontSize: 18,
    lineHeight: 19
  },
  businessText: {
    color: 'gray',
    fontFamily: FONTS.BalooThambiRegular2,
    fontSize: 14,
    marginTop: -4
  },
  websiteText: {
    color: 'white',
    fontFamily: FONTS.BalooThambiRegular2,
    fontSize: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: '7%',
  },
  followButton: {
    width: "29%",
    backgroundColor: "#14a5fe",
    borderRadius: 6,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageButton: {
    width: "29%",
    backgroundColor: "black",
    borderRadius: 6,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7e7e7e'
  },
  emailButton: {
    width: "29%",
    backgroundColor: "black",
    borderRadius: 6,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7e7e7e'
  },
  arrowButton: {
    width: 30,
    borderWidth: 1,
    borderColor: '#7e7e7e',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'black',
    marginLeft: 1
  },
  arrowIcon: {
    height: 13,
    width: 13
  },
  buttonText: {
    color: 'white',
    fontFamily: FONTS.BalooThambiMedium,
    fontSize: 17
  }
});
