// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
// Import the fetchPopularMovies function from services.js
import {
  fetchPopularMovies,
  fetchNewMovies,
  fetchTVshows,
  fetchHorrorMovies,
  fetchAllAnime
} from '../data/fetchApi';
import Swiper from 'react-native-swiper';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }) {
  
  // Create a state variable called movies to store the movie data
  const [movies, setMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [kTVShows, setKTVShows] = useState([]);
  const [horrorShows, setHorrorShows] = useState([]);
  const [animes, setAnimes] = useState([]);
  // Create a constant variable called LIMIT to store the limit number of movies
  const LIMIT = 8;
  const NewLimit = 4;

  // Use the useEffect hook to fetch the movie data when the component mounts
  useEffect(() => {
    // Call the fetchPopularMovies function with the limit number and update the movies state with the results
    fetchPopularMovies(LIMIT).then((results) => setMovies(results));
    fetchNewMovies('US', NewLimit).then((results) => setNewMovies(results));
    fetchTVshows(LIMIT).then((results) => setKTVShows(results));
    fetchHorrorMovies(LIMIT).then((results) => setHorrorShows(results));
    fetchAllAnime(LIMIT).then((results) => setAnimes(results));
  }, []);

  return (
    <ScrollView className="bg-black h-screen ">

        {/*New Movies*/}
        <View className="bg-black h-[600px] ">
          {/* New Movies */}
          {/* Wrap the ScrollView component with the Swiper component */}
          <Swiper loop={true} autoplay={true}>
            {/* Map over the newMovies array and render each movie as an Image component */}
            {newMovies.map((movie) => (
              <TouchableOpacity key={movie.id} onPress={() => navigation.navigate('Single', { movie: movie })}>
                <Image
                  source={{ uri: movie.poster }}
                  className="w-full h-full bg-gradient-opacity rounded-b-lg"
                />
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>

        {/*Popular Movies*/}
        <View className="conatiner px-2 pt-8 rounded-md">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-white text-xl font-semibold">
              Trending Now
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
               <Text className="text-gray-400 text-md font-medium">See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={true} className="gap-4 mt-0">
           {/* Map over the movies array and render each movie as an Image component */}
          {movies.map((movie) => (
              <TouchableOpacity key={movie.id} onPress={() => navigation.navigate('Single', { movie: movie })}>
                  <Image
                    source={{ uri: movie.poster }}
                    className="w-36 h-52 rounded-md"
                  />
              </TouchableOpacity>
            ))}
          </ScrollView>
      </View>
      

          {/*Korean Movies*/}
        <View className="conatiner px-2 pt-8 rounded-md">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-white text-xl font-semibold">
              Korean Tv Drama
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
               <Text className="text-gray-400 text-md font-medium">See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} className="gap-4 mt-0">
            {/* Map over the movies array and render each movie as an Image component */}
            {kTVShows.map((movie) => ( // rename kTVShow to movie
              <TouchableOpacity key={movie.id} onPress={() => navigation.navigate('Single', { movie: movie })}>
                <Image source={{ uri: movie.poster }} className="w-36 h-52 rounded-md" />
              </TouchableOpacity>
            ))}
          </ScrollView>
      </View>
      
      {/*Horror Movies*/}
      <View className="conatiner px-2 pt-8 rounded-md">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-white text-xl font-semibold">
              Horror Shows
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
               <Text className="text-gray-400 text-md font-medium">See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} className="gap-4 mt-0">
            {/* Map over the movies array and render each movie as an Image component */}
            {horrorShows.map((movie) => ( // rename kTVShow to movie
              <TouchableOpacity key={movie.id} onPress={() => navigation.navigate('Single', { movie: movie })}>
                <Image source={{ uri: movie.poster }} className="w-36 h-52 rounded-md" />
              </TouchableOpacity>
            ))}
          </ScrollView>
      </View>
      

      {/*Animw*/}
      <View className="conatiner px-2 pt-8 rounded-md">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-white text-xl font-semibold">
              Anime
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
               <Text className="text-gray-400 text-md font-medium">See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} className="gap-4 mt-0">
            {/* Map over the movies array and render each movie as an Image component */}
            {animes.map((movie) => ( // rename kTVShow to movie
              <TouchableOpacity key={movie.id} onPress={() => navigation.navigate('Single', { movie: movie })}>
                <Image source={{ uri: movie.poster }} className="w-36 h-52 rounded-md" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

 
    </ScrollView>
  );
}
