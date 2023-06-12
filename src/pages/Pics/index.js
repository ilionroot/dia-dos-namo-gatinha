import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Ionicons } from "react-native-vector-icons";
import { RNCamera } from "react-native-camera";

import { useGeral } from "../../contexts/geral";

import { api } from "../../services/api";
import * as RootNavigation from "../../../RootNavigation";

import { styles } from "./styles";

const CameraComponent = ({ cameraRef, isBackCam }) => {
  const [isPreview, setIsPreview] = React.useState(false);
  const [base64, setBase64] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { name } = useGeral();

  async function takePicture() {
    try {
      const data = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
      });
      setBase64(`data:image/png;base64,${data.base64}`);
      setIsPreview(true);
    } catch (error) {
      console.log(error, "ERROR <<<<<<<<<<<<<");
    }
  }

  function cancel() {
    setBase64("");
    setIsPreview(false);
    setIsLoading(false);
  }

  function send() {
    setIsLoading(true);
    api
      .post("/deagora", {
        photo: base64.reverse(),
        gatinha: name === "gatinha",
      })
      .then(() => {
        cancel();
        RootNavigation.navigate("Home");
        Alert.alert("Etcha", "Foto enviada com sucesso!");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Falha", "Erro ao enviar a foto ):");
        cancel();
      });
  }

  return (
    <View style={styles.camContainer}>
      <RNCamera
        ref={cameraRef}
        captureAudio={false}
        style={styles.cam}
        type={
          isBackCam
            ? RNCamera.Constants.Type.back
            : RNCamera.Constants.Type.front
        }
      >
        <Text>.</Text>
      </RNCamera>
      <TouchableOpacity
        onPress={takePicture}
        activeOpacity={0.75}
        style={styles.takePictureButton}
      />
      {isPreview && (
        <>
          <Image
            style={styles.preview}
            source={{ uri: base64 !== "" ? base64 : null }}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={cancel}
              activeOpacity={0.75}
              style={styles.actionButton}
            >
              <Text style={styles.backText}>Cancelar</Text>
            </TouchableOpacity>

            {isLoading ? (
              <ActivityIndicator
                style={styles.loader}
                color={"#F24949"}
                size={32}
              />
            ) : (
              <TouchableOpacity
                onPress={send}
                activeOpacity={0.75}
                style={styles.actionButton}
              >
                <Text style={styles.backText}>Enviar</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const Pics = () => {
  const [isBackCam, setIsBackCam] = React.useState(false);

  let cameraRef = React.useRef(null);

  async function flipCam() {
    setIsBackCam(!isBackCam);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>De agora</Text>
        <TouchableOpacity activeOpacity={0.75} onPress={flipCam}>
          <Ionicons
            color={"rgba(0,0,0,0.85)"}
            size={32}
            name="camera-reverse"
          />
        </TouchableOpacity>
      </View>
      <CameraComponent cameraRef={cameraRef} isBackCam={isBackCam} />
    </View>
  );
};

export default Pics;
