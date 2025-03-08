import {Text, Button, Image, StyleSheet, Platform , View, Animated, Easing} from 'react-native';
import React, { useState,useEffect,useRef } from 'react';
import { Picker } from '@react-native-picker/picker';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function DetailScreen(props: any) {
  const [selectedGenre, setSelectedGenre] = useState('male');
  const rotateValue = useRef(new Animated.Value(0)).current;
  const navigation = props.navigation;
  const [data, setData] = useState(null);
  
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    
    <View style={{ flex: 1 }}>
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
                 <Button
                      title="Go to Home"
                      onPress={() =>
                        navigation.navigate('Home', {name: 'Jane'})
                      }
                    />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Fetched Data:</ThemedText>
          {data ? (
            <Text>{JSON.stringify(data)}</Text>
          ) : (
            <Text>Loading...</Text>
          )}
        </ThemedView>
    </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  pickerContainer: {
    
    ...Platform.select({
      ios: {
        width: 150,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
      },
      android: {},
      web: {
        width: 160,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
        alignContent: 'center',
        justifyContent: 'center',
      },
    }),
  },
  picker: {
    height: 150,
    width: 150,
  },
  logorotate: {
    height: 200,
    width: 200,
    bottom: 0,
    left: 0,
    transform: [{ rotate: '180deg' }],

  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
