import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { IPDetails } from '../Types';
import DetailItem from '../components/DetailItem';

type DetailScreenProps = {
  route: RouteProp<{ params: { image: ImageSourcePropType, ipDetails: IPDetails } }, 'params'>
  navigation: NavigationProp<any, any>
}

const DetailScreen: React.FC<DetailScreenProps> = (props) => {
  const { image, ipDetails } = props.route.params;

  return (
    <View style={styles.screenContainer}>
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <DetailItem label="IP Address" value={ipDetails?.ip} />
        <DetailItem 
          label="Location" 
          value={`${ipDetails?.city} ${ipDetails?.country_code} ${ipDetails?.postal}`} 
        />
        <DetailItem 
          label="Timezone" 
          value={`${ipDetails?.timezone.abbr} ${ipDetails?.timezone.utc}`} 
        />
        <DetailItem label="ISP" value={ipDetails?.connection?.isp} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  imageWrapper: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    borderRadius: 20,
  },
  detailsContainer: {
    backgroundColor: 'black',
    paddingHorizontal: 5,
    paddingVertical: 25,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default DetailScreen;
