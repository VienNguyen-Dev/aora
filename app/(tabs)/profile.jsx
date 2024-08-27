import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";

import { getUserPosts, signOut } from "../../lib/appwite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../components/VideoCard";
import EmptyState from "../components/EmptyState";
import InfoBox from "../components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className=" bg-primary h-full">
      <FlatList
        data={posts}
        // data={[{ id: 1 }, { id: 2 }]}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="px-4 mt-6 mb-12 justify-center items-center">
            <TouchableOpacity onPress={logout} activeOpacity={0.7} className="justify-end w-full items-end">
              <Image source={icons.logout} className="h-6 text-[#FF5B5B] w-6 mb-10" resizeMode="contain" />
            </TouchableOpacity>
            <View
              className="items-center border justify-center rounded-lg border-secondary-200
             w-16 h-16"
            >
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%]
                rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox title={user?.username} containerStyles="mt-5" textStyles="text-lg" />
            <View className="flex-row mt-5">
              <InfoBox title={posts.length || 0} subtitle="Posts" containerStyles="mr-10" textStyles="text-xl" />
              <InfoBox title={"1.2k"} subtitle="Followers" textStyles="text-xl" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No Videos Found" subtitle="No videos found for this search query" />}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
