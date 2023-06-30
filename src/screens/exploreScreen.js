import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

import {fetchAllMovies} from '../data/fetchApi';

export default function ExploreScreen({ navigation }) {

  const [AllMovies, setAllMovies] = useState([]);
  const LIMIT = 60;
  const rows = Math.ceil(AllMovies.length / 2);

  useEffect(() => {
    fetchAllMovies(LIMIT).then((results) => setAllMovies(results));
  }, []);

  return (
    <View className="bg-black h-full">
       <View className="conatiner px-2 pt-8 rounded-md">
          <View className="flex flex-row justify-between items-center mb-2">
            <Text className="text-white text-xl font-semibold mt-5 ml-5">
              Explore all shows
            </Text>
          </View>
          <ScrollView className="gap-4 mt-0 w-full mb-20">
              {/* Create rows and columns for the movies */}
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <View key={rowIndex} className="flex flex-row gap-4 w-11/12 justify-between">
                  {/* Render two movies in each row */}
                  {AllMovies.slice(rowIndex * 2, rowIndex * 2 + 2).map((movie) => (
                    <TouchableOpacity key={movie.id} onPress={() => navigation.navigate('Single', { movie: movie })}>
                      <Image source={{ uri: movie.poster }} className="w-36 h-52 rounded-md ml-3" />
                    </TouchableOpacity>
                  ))}
                </View>
              ))}

              {/* Create a column for the remaining movies */}
              {AllMovies.slice(rows * 2).map((movie) => (
                <TouchableOpacity key={movie.id} onPress={() => navigation.navigate('Single', { movie: movie })}>
                  <Image source={{ uri: movie.poster }} className="w-36 h-52 rounded-md" />
                </TouchableOpacity>
              ))}
            </ScrollView>
        </View>
    </View>
  );
}
