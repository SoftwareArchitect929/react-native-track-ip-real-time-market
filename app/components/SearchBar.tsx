import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type SearchBarProps = {
  isActive: boolean;
  searchQuery: string;
  onSearchQueryChange: (text: string) => void; 
  onToggleActive: (isActive: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isActive, searchQuery, onSearchQueryChange, onToggleActive }) => {
  const handleClearSearch = () => {
    onSearchQueryChange('');
  };

  const handleFocus = () => {
    onToggleActive(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <MaterialIcons
          name='search'
          size={20}
          color='black'
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder='Search'
          value={searchQuery}
          onChangeText={onSearchQueryChange}
          onFocus={handleFocus}
          accessibilityLabel='Search Input'
        />
        <TouchableOpacity
          onPress={handleClearSearch}
          style={styles.clearButton}
          accessibilityLabel='Clear Search'
        >
          <MaterialIcons
            name='chevron-right'
            size={20}
            color='black'
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  searchBar: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: '80%',
  },
  clearButton: {
    padding: 5,
    borderRadius: 15,
  },
  icon: {
    marginLeft: 5,
  },
});
