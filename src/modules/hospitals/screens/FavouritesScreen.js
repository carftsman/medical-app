import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import DoctorCard from '../components/DoctorCard';

const FavouritesScreen = () => {
  const favourites = useSelector(state => state.favourites.items);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DoctorCard doctor={item} />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 40 }}>
            No favourite doctors yet ❤️
          </Text>
        }
      />
    </View>
  );
};

export default FavouritesScreen;
