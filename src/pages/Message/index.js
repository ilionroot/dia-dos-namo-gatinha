import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

import { styles } from "./styles";

String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};

const Message = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          activeOpacity={0.75}
        >
          <MaterialIcons name="arrow-back-ios" size={32} />
        </TouchableOpacity>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          {route.params.message.message.reverse()}
        </Text>
      </View>
    </View>
  );
};

export default Message;
