import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/buttons/customButton";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

const Welcome = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      {/* bg radial gradient */}
      <Image
        source={images.centerRadialGradient}
        resizeMode="cover"
        className="absolute top-0 left-0 w-full h-full"
      />
      {/* patterns */}
      <Image
        source={images.pattern1}
        resizeMode="contain"
        className="absolute -top-16 left-0 w-full h-full"
      />
      {/* content */}
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          height: "100%",
          paddingBottom: "20px",
        }}
      >
        <View className="w-full flex justify-start items-center h-full p-4">
          {/* logo */}
          <Animated.View entering={FadeInDown.delay(100).springify()}>
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[180px] h-[45px] my-6"
            />
          </Animated.View>
          {/* cards */}
          <Animated.View
            entering={FadeInDown.delay(200).springify()}
            className="w-full h-1/2"
          >
            <Image
              source={images.cards}
              resizeMode="contain"
              className="w-full h-full"
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(300).springify()}>
            <Text className="text-3xl text-white font-bold text-center mt-2">
              Elevate Your Images{"\n"}
              with <Text className="color-secondary">Crysta</Text>
            </Text>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(400).springify()}>
            <Text className=" font-pregular text-gray-100 mt-6 text-center">
              Upscale, Enhance, Denoise, and Deblur your{"\n"}Photos — all with
              Crysta’s powerful tools.
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(500).springify()}
            className="mt-9 w-full"
          >
            <CustomButton
              title="Get Started"
              handlePress={() => router.push("/home")}
              containerStyles="w-full"
            />
          </Animated.View>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
