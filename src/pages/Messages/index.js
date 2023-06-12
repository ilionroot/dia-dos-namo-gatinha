import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AntDesign } from "react-native-vector-icons";
import { FontAwesome5 } from "react-native-vector-icons";

import { useGeral } from "../../contexts/geral";
import { api } from "../../services/api";
import { styles } from "./styles";

String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};

const ModalComponent = ({ toggleModal, createMessage }) => {
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent
      onRequestClose={toggleModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={{ ...styles.title, fontSize: 24 }}>
              Criar mensagem
            </Text>
            <TouchableOpacity onPress={toggleModal} activeOpacity={0.75}>
              <AntDesign name="close" size={24} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.textInput}
            multiline
            textAlignVertical="top"
            maxLength={350}
            onChangeText={(text) => setMessage(text)}
          />
          {isLoading ? (
            <ActivityIndicator
              color={"#F24949"}
              style={{ marginVertical: 24 }}
              size={32}
            />
          ) : (
            <TouchableOpacity
              onPress={async () => {
                setIsLoading(true);
                createMessage(message)
                  .then(() => {
                    setIsLoading(false);
                    toggleModal();
                  })
                  .catch(() => {
                    Alert.alert("Ops!", "Algo deu errado, tente novamente.");
                    setIsLoading(false);
                    toggleModal();
                  });
              }}
              activeOpacity={0.75}
              style={styles.createButton}
            >
              <Text style={styles.createButtonText}>Criar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const Message = ({ item, navigation }) => {
  function openMessage() {
    navigation.navigate("Message", { message: item });
  }

  return (
    <TouchableOpacity
      onPress={() => {
        openMessage(item);
      }}
      activeOpacity={0.75}
      style={styles.message}
    >
      <FontAwesome5
        name="cat"
        size={24}
        color={item.gatinha ? "rgb(255,128,218)" : "rgb(118, 214, 255)"}
      />
      <Text style={styles.messageText}>
        {item.message.substring(0, 85).reverse()}
        {item.message.length > 85 ? (
          <Text style={styles.continueText}>...</Text>
        ) : (
          ""
        )}
      </Text>
    </TouchableOpacity>
  );
};

const Messages = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { name } = useGeral();

  function toggleModal() {
    setModalVisible(!modalVisible);
  }

  function createMessage(message) {
    return new Promise((resolve, reject) => {
      api
        .post("/messages", {
          message: message.reverse(),
          gatinha: name === "gatinha",
        })
        .then((res) => {
          setMessages([
            ...messages,
            { message: message.reverse(), gatinha: name === "gatinha" },
          ]);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  React.useEffect(() => {
    api
      .get("/messages")
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        Alert.alert("Ops!", "Algo deu errado, tente novamente.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity onPress={toggleModal} activeOpacity={0.75}>
          <AntDesign name="plus" size={24} color="rgba(0,0,0,0.85)" />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator
          color={"#F24949"}
          style={{ marginVertical: 24 }}
          size={32}
        />
      ) : (
        <FlatList
          style={styles.messagesContainer}
          data={messages.reverse()}
          renderItem={({ item }) => {
            return <Message navigation={navigation} item={item} />;
          }}
        />
      )}
      {modalVisible && (
        <ModalComponent
          toggleModal={toggleModal}
          createMessage={createMessage}
        />
      )}
    </View>
  );
};

export default Messages;
