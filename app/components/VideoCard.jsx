import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { icons } from "../../constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col px-4 mb-14 items-center">
      <View className="flex-row items-start gap-3">
        <View className="flex-row flex-1 items-center justify-center">
          <View className="w-[46px] h-[46px] border border-secondary-100 p-0.5 rounded-lg items-center justify-center">
            <Image source={{ uri: avatar }} className="w-full h-full" resizeMode="cover" />
          </View>
          <View className="flex-1 justify-center ml-3 gap-y-1">
            <Text className="text-sm text-white font-psemibold" numberOfLines={1}>
              {title}
            </Text>
            <Text className="font-pregular text-xs text-[#CDCDE0]">{username}</Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-6 h-6" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <>
          <Video source={{ uri: video }} className="w-full h-60 mt-3 rounded-xl" resizeMode={ResizeMode.COVER} useNativeControls isLooping />
        </>
      ) : (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setPlay(true)} className="w-full h-60 rounded-xl relative justify-center items-center mt-3">
          <Image source={{ uri: thumbnail }} className="w-full h-full rounded-xl mt-3 items-center" resizeMode="cover" />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({});
