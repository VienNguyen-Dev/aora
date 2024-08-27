import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../components/SearchInput";
import Trending from "../components/Trending";
import EmptyState from "../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/appwite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    //Call ref if have any video
    await refetch();
    setRefreshing(false);
  };

  const { data: latestPosts } = useAppwrite(getLatestPosts);
  return (
    <SafeAreaView className=" bg-primary">
      {/* Sử dụng FlatList dể hiển thị danh sách cads phần tử của một mảng (video) theo chiều dọc hoặc chiều ngang và có thể cuộn */}
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="px-4 my-6 space-y-6">
            <View className="justify-between items-start mb-6 flex-row">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Wellcome to back,</Text>
                <Text className="font-psemibold text-2xl text-white">{user?.username}</Text>
              </View>
              <View className="mt-1.5">
                <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain" />
              </View>
            </View>
            <SearchInput />
            <View className="pt-5 pb-8 w-full flex-1">
              <Text className="text-gray-100 text-lg font-pmedium mb-3">Latest Videos</Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No Videos Found" subtitle="Be the first one to upload a video" />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
