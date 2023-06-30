// In SingleScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { fetchMovieDetails } from '../data/fetchApi'; // import fetchMovieDetails function
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SingleScreen({ route }) {
  const { movie } = route.params; // get movie from params
  const [details, setDetails] = useState(null); // create a state variable for details

  // Use the useEffect hook to fetch the movie details when the component mounts
  useEffect(() => {
    // Call the fetchMovieDetails function with the movie id and update the details state with the result
    fetchMovieDetails(movie.id).then((result) => setDetails(result));
  }, []);

  return (
    <View className="bg-black h-full">
      {details && ( 
        <View>
              <Image source={{ uri: `https://image.tmdb.org/t/p/w780${details.backdrop_path}` }} className="w-screen h-30 aspect-video" />
          <View className="container">
            
            <View className="flex flex-row items-center justify-between w-11/12 mt-3 mx-4">
              <Text className="text-white text-2xl font-medium w-2/4">{movie.title}</Text> 
              <View className="flex flex-row gap-3 ml-12">
                <Text className="text-zinc-500">{details.release_date}</Text> 
                <Text className="text-zinc-500">{details.runtime}m</Text> 
              </View>
            </View>
            <Text className="text-zinc-500 mx-4">{details.genres.map((genre) => genre.name).join(', ')}</Text> 
            
            <TouchableOpacity className="bg-red-600 rounded-md w-11/12 h-8 items-center justify-center self-center mt-10">
              <Text className="text-white font-medium">Watch Now</Text>
            </TouchableOpacity>
            
            <Text className="text-white text-2xl font-medium mt-6 mx-4">Prolog</Text>
              <Text className="text-zinc-500 mx-4">{details.overview}</Text> 
              
             

                <Text className="text-white text-xl font-semibold mt-6 mb-3 mx-4">Top Cast</Text>
          </View>
          <ScrollView className="gap-8 mx-4" horizontal={true} > 
            {details.credits.cast.slice(0, 5).map((actor) => ( 
              
                <View className="flex flex-col items-center justify-center" key={actor.id}>
                  <Image source={{ uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}` }} className="w-24 h-24 rounded-full" /> 
                  <Text className="text-white text-xs mt-1">{actor.name}</Text>
                </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
