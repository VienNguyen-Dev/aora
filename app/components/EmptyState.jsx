import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { images } from "../../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} className="w-[270px] h-[230px]" resizeMode="contain" />
      <Text className="font-psemibold text-xl mt-2 text-white text-center"> {title}</Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <CustomButton title={"Create video"} handlePress={() => router.push("/create")} containerStyles={"my-5 w-full"} />
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({});
