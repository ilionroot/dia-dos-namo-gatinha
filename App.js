import React from "react";
import { Dimensions, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";
import GeralContextProvider from "./src/contexts/geral";

import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { setCustomText } from "react-native-global-props";

import Splash from "./src/pages/Splash";
import Home from "./src/pages/Home";

import colors from "./colors";

const BottomTabsNavigator = createBottomTabNavigator();

// Icons for tabs
import { AntDesign } from "react-native-vector-icons";

export default function App() {
  const [selectedIconAnimations] = React.useState([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]);

  React.useEffect(() => {
    SplashScreen.hide();
    setCustomText({
      style: {
        fontFamily: "Nunito-Regular",
      },
    });
  }, []);

  const [isSplashing, setIsSplashing] = React.useState(true);

  if (isSplashing) {
    return <Splash setIsSplashing={setIsSplashing} />;
  }

  return (
    <GeralContextProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <BottomTabsNavigator.Navigator
          screenOptions={{
            tabBarStyle: {
              height: 65,
              bottom: 20,
              left: 70,
              position: "absolute",
              width: Dimensions.get("screen").width - 140,
              borderRadius: Dimensions.get("screen").width - 140,
              elevation: 10,
              shadowColor: "#000",
            },
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.primary,
          }}
          initialRouteName="Home"
        >
          <BottomTabsNavigator.Screen
            name="Homi"
            component={Home}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Animated.View
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: selectedIconAnimations[0].interpolate({
                      inputRange: [0, 1],
                      outputRange: ["white", colors.primary],
                    }),
                    elevation: selectedIconAnimations[0].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 5],
                    }),
                    shadowColor: "rgba(0,0,0,0.5)",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 32,
                    transform: [
                      {
                        translateY: selectedIconAnimations[0].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -20],
                        }),
                      },
                      {
                        scale: selectedIconAnimations[0].interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.1],
                        }),
                      },
                    ],
                  }}
                >
                  <AntDesign
                    name="star"
                    color={focused ? "white" : color}
                    size={24}
                  />
                </Animated.View>
              ),
            }}
            listeners={{
              focus: () => {
                Animated.timing(selectedIconAnimations[0], {
                  toValue: 1,
                  duration: 100,
                  useNativeDriver: false,
                }).start();
              },
              blur: () => {
                Animated.timing(selectedIconAnimations[0], {
                  toValue: 0,
                  duration: 100,
                  useNativeDriver: false,
                }).start();
              },
            }}
          />
          <BottomTabsNavigator.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Animated.View
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: selectedIconAnimations[1].interpolate({
                      inputRange: [0, 1],
                      outputRange: ["white", colors.primary],
                    }),
                    elevation: selectedIconAnimations[1].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 5],
                    }),
                    shadowColor: "rgba(0,0,0,0.5)",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 32,
                    transform: [
                      {
                        translateY: selectedIconAnimations[1].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -20],
                        }),
                      },
                      {
                        scale: selectedIconAnimations[1].interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.1],
                        }),
                      },
                    ],
                  }}
                >
                  <AntDesign
                    name="shake"
                    color={focused ? "white" : color}
                    size={24}
                  />
                </Animated.View>
              ),
            }}
            listeners={{
              focus: () => {
                Animated.timing(selectedIconAnimations[1], {
                  toValue: 1,
                  duration: 100,
                  useNativeDriver: false,
                }).start();
              },
              blur: () => {
                Animated.timing(selectedIconAnimations[1], {
                  toValue: 0,
                  duration: 100,
                  useNativeDriver: false,
                }).start();
              },
            }}
          />
          <BottomTabsNavigator.Screen
            name="Hom"
            component={Home}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Animated.View
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: selectedIconAnimations[2].interpolate({
                      inputRange: [0, 1],
                      outputRange: ["white", colors.primary],
                    }),
                    elevation: selectedIconAnimations[2].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 5],
                    }),
                    shadowColor: "rgba(0,0,0,0.5)",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 32,
                    transform: [
                      {
                        translateY: selectedIconAnimations[2].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -20],
                        }),
                      },
                      {
                        scale: selectedIconAnimations[2].interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.1],
                        }),
                      },
                    ],
                  }}
                >
                  <AntDesign
                    name="camera"
                    color={focused ? "white" : color}
                    size={24}
                  />
                </Animated.View>
              ),
            }}
            listeners={{
              focus: () => {
                Animated.timing(selectedIconAnimations[2], {
                  toValue: 1,
                  duration: 100,
                  useNativeDriver: false,
                }).start();
              },
              blur: () => {
                Animated.timing(selectedIconAnimations[2], {
                  toValue: 0,
                  duration: 100,
                  useNativeDriver: false,
                }).start();
              },
            }}
          />
        </BottomTabsNavigator.Navigator>
      </NavigationContainer>
    </GeralContextProvider>
  );
}
