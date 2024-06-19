import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import SearchBar from '../components/SearchBar';
import { fetchIPDetails } from '../services/IPService';
import { s1, s2, s3, s4, s5, s6 } from '../assets/images';
import { IPDetails } from '../Types';
import DetailItem from '../components/DetailItem';

type HomeScreenProps = {
  navigation: NavigationProp<any, any>;
}

const images = [s1, s2, s3, s4, s5, s6];
const { width } = Dimensions.get('window');

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [ipDetails, setIpDetails] = useState<IPDetails | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    fetchIPDetails().then(data => setIpDetails(data));
  }, []);

  const handleImageSelect = (image: ImageSourcePropType) => {
    navigation.navigate('Profile', { image, ipDetails });
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerLabel}>IP Tracker</Text>
        <View style={styles.searchBarWrapper}>
          <SearchBar
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            isActive={isActive}
            onToggleActive={setIsActive}
          />
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <DetailItem label="IP Address" value={ipDetails?.ip} />
        <DetailItem label="Location" value={`${ipDetails?.city} ${ipDetails?.country_code} ${ipDetails?.postal}`} />
        <DetailItem label="Timezone" value={`${ipDetails?.timezone.abbr} ${ipDetails?.timezone.utc}`} />
        <DetailItem label="ISP" value={ipDetails?.connection?.isp} />
      </View>
      <View style={styles.carouselWrapper}>
        <Carousel
          loop
          width={width}
          height={width / 2}
          autoPlay={false}
          data={images}
          scrollAnimationDuration={1000}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          renderItem={({ index }) => (
            <View style={styles.carouselItemContainer}>
              <TouchableOpacity onPress={() => handleImageSelect(images[index])}>
                <Image source={images[index]} style={styles.carouselImage} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'blue',
    paddingVertical: 40,
    justifyContent: 'center',
  },
  headerLabel: {
    marginBottom: 20,
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  searchBarWrapper: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  detailsContainer: {
    backgroundColor: 'black',
    paddingHorizontal: 5,
    paddingVertical: 25,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  carouselWrapper: {
    flex: 1,
    paddingTop: 40,
  },
  carouselItemContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  carouselImage: {
    width: '100%',
    resizeMode: 'stretch',
  },
});

export default HomeScreen;
