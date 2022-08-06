import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
  Easing,
} from "react-native";

import LottieView from "lottie-react-native";

import { styles } from "./styles";

const ReceivedComponent = ({ setReceived, speed }) => {
  let bellRef = React.useRef(null);

  let fadeAnimation = React.useRef(new Animated.Value(0));
  let bellAnimation = React.useRef(new Animated.Value(0));

  let [statusBar, setStatusBar] = React.useState(false);

  React.useEffect(() => {
    Animated.timing(bellAnimation.current, {
      toValue: 1,
      duration: 300 / speed,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      bellRef.current.play();
    });
  }, []);

  return (
    <>
      <Animated.View
        style={{
          position: "absolute",
          top: "1%",
          right: 0,
          width: 100,
          height: 100,
          transform: [
            {
              translateY: bellAnimation.current.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
              }),
            },
          ],
        }}
      >
        <LottieView
          ref={bellRef}
          source={require("../../assets/animations/93747-bell-notification.json")}
          loop={false}
          speed={speed}
          onAnimationFinish={() => {
            Animated.timing(fadeAnimation.current, {
              toValue: 1,
              duration: 300 / speed,
              easing: Easing.ease,
              useNativeDriver: true,
            }).start(() => {
              setStatusBar(true);
            });
          }}
        />
      </Animated.View>
      <Animated.View
        style={{
          ...styles.container,
          opacity: fadeAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        }}
      >
        <StatusBar barStyle={statusBar ? "light-content" : "dark-content"} />
        <View style={styles.block}>
          <Text style={styles.title}>Alguém está pensando em ti agora!</Text>
          <Text style={styles.adivinha}>(adivinha)</Text>
        </View>
        <LottieView
          source={require("../../assets/animations/104853-thinking.json")}
          autoPlay
          loop
          style={styles.animation}
        />
        <TouchableOpacity
          style={styles.contribuirButton}
          activeOpacity={0.75}
          onPress={() => {
            Animated.timing(fadeAnimation.current, {
              toValue: 0,
              duration: 100 / speed,
              easing: Easing.ease,
              useNativeDriver: true,
            }).start(() => {
              setStatusBar(false);
            });
            Animated.timing(bellAnimation.current, {
              toValue: 0,
              duration: 300 / speed,
              delay: 500 / speed,
              easing: Easing.ease,
              useNativeDriver: true,
            }).start(() => {
              setReceived(false);
            });
          }}
        >
          <Text style={styles.contribuirButtonText}>Vou retribuir!</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default ReceivedComponent;
