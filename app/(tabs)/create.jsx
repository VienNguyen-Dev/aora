import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import FormField from "../components/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import CustomButton from "../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image" ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };
  const onSubmit = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      return Alert.alert("Error", "Please fill in all fields");
    }
    try {
      await createVideo({ ...form, userId: user.$id });
      Alert.alert("Success", "Post uploaded successfully!");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-xl font-psemibold text-white">Uploading Video</Text>

        <FormField title={"Video Title"} placeholder={"Give your video a catchy title..."} value={form.title} handleChangeText={(e) => setForm({ ...form, title: e })} otherStyles={"mt-10"} />
        <View className="mt-7 space-y-2">
          <Text className="text-[#CDCDE0] text-base font-pmedium">Uploading Video</Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <>
                <Video source={{ uri: form.video.uri }} className="w-full h-64 mt-3 rounded-xl" resizeMode={ResizeMode.COVER} />
              </>
            ) : (
              <View className="w-full h-40 items-center justify-center bg-[#1E1E2D] rounded-2xl">
                <View className="border border-dashed border-secondary-200 w-14 h-14 justify-center items-center">
                  <Image source={icons.upload} className="w-1/2 h-1/2 " resizeMode="contain" />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-[#CDCDE0] text-base font-pmedium">Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image source={{ uri: form.thumbnail.uri }} className="w-full h-64 rounded-2xl" resizeMode="cover" />
            ) : (
              <View className="w-full h-16 border border-black-100 flex-row items-center justify-center bg-[#1E1E2D] rounded-2xl space-x-2">
                <Image source={icons.upload} className="w-6 h-6" resizeMode="contain" />

                <Text className="text-sm font-pmedium text-gray-100">Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField title={"AI Prompt"} placeholder={"The AI prompt of your video..."} value={form.prompt} handleChangeText={(e) => setForm({ ...form, prompt: e })} otherStyles={"mt-7"} />
        <CustomButton title={"Submit & Publish"} containerStyles={"w-full mt-7"} handlePress={onSubmit} isLoading={uploading} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({});
