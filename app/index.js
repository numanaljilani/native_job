import { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, SIZES, SHADOWS, icons, images } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";

const Home = () => {

const [searchTerm , setSearchTerm ] = useState("");
const router = useRouter()
  return (
    <SafeAreaView className={`flex-1 ${COLORS.lightWhite} `}>
      <Stack.Screen 
      
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle : ''
        }}
        
      />
      
      <ScrollView showsVerticalScrollIndicator = { false }>
      <View className = {`flex-1 p-4`} >
      <Welcome 
      searchTerm={searchTerm}
      setSearchTerm={ setSearchTerm }
      handleClick={
      ()=>{ if(searchTerm){
      router.push(`/search/${searchTerm}`)
      }}
      }
      />
      
      <Popularjobs/>
      
      <Nearbyjobs/>
      
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
