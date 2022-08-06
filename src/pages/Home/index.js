import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useGeral } from "../../contexts/geral";

import LottieView from "lottie-react-native";

import { api } from "../../services/api";
import { styles } from "./styles";

const Home = () => {
  const { last, name } = useGeral();

  let pressToSendAnimation = useRef(new Animated.Value(0));
  let lottieViewRef = useRef();
  let animationRef = useRef(true);

  function hearPress() {
    lottieViewRef.current.play();
    api.post("/missing-you", {
      isGatinha: name === "gatinha",
    });
  }

  useEffect(() => {
    lottieViewRef.current.play();
    setInterval(() => {
      Animated.timing(pressToSendAnimation.current, {
        toValue: animationRef.current ? 1 : 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        animationRef.current = !animationRef.current;
      });
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Avise {name == "gatinha" ? "seu gatinho" : "sua gatinha"} que está com
        saudades!
      </Text>
      {last ? (
        <>
          <Text style={styles.lastTitle}>Última recebida</Text>
          <Text style={styles.lastDate}>
            Data:{" "}
            {`${last.substr(8, 2)}/${last.substr(5, 2)}/${last.substr(0, 4)}`}
          </Text>
          <Text style={styles.lastDate}>
            Hora: {`${last.substr(11, 2)}:${last.substr(14, 2)}`}
          </Text>
        </>
      ) : (
        <></>
      )}
      <TouchableOpacity
        style={{
          width: 300,
          height: 300,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          paddingRight: 8,
        }}
        activeOpacity={0.75}
        onPress={hearPress}
      >
        <LottieView
          ref={lottieViewRef}
          style={{
            width: 800,
            height: 800,
          }}
          source={require("../../assets/animations/splash_animation.json")}
          loop={false}
          speed={2}
        />
      </TouchableOpacity>
      <Animated.Text
        style={{
          ...styles.subtitle,
          opacity: pressToSendAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0.1, 1],
          }),
        }}
      >
        Pressione o ❤ para avisar
      </Animated.Text>
    </View>
  );
};

export default Home;
