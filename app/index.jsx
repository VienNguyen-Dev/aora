import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CumstomButton from "../app/components/CustomButton.jsx";
import { Redirect, router } from "expo-router";
import "react-native-url-polyfill/auto";
import { useGlobalContext } from "../context/GlobalProvider.js";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href={"/home"} />;
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full justify-center items-center px-4 min-h-[84vh]">
          <Image source={images.logo} className="w-[130px] h-[84px] " resizeMode="contain" />
          <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMode="contain" />
          <View className="relative mt-5">
            <Text className="text-3xl font-bold text-white text-center">
              Discover Endless Possibilities with <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image source={images.path} className=" absolute -bottom-2 -right-8 w-[136px] h-[15px]" resizeMode="contain" />
          </View>
          <Text className="font-pregular text-sm text-[#CDCDE0] text-center mt-7">Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora</Text>
          <CumstomButton
            title={"Countinue with email"}
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor={"#161622"} style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
