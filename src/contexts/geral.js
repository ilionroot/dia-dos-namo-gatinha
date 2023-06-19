import React, { createContext, useContext, useState, useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GeralContext = createContext({});

import ReceivedComponent from "../components/ReceivedComponent";

import * as RootNavigation from "../../RootNavigation";

import { api } from "../services/api";

const GeralContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [last, setLast] = useState("");
  const [received, setReceived] = useState(false);
  const [name] = useState("gatinho");

  async function verifyLocalData() {
    const lastStorage = await AsyncStorage.getItem("last");
    if (lastStorage) {
      setLast(
        new Date(
          Number(lastStorage) - new Date().getTimezoneOffset() * 60000
        ).toISOString()
      );
    }
  }

  useEffect(() => {
    verifyLocalData();

    messaging()
      .getToken()
      .then((token) => {
        setToken(token);
        api.post("/missing-you-register", {
          token,
          name,
          userId: Math.floor(Math.random() * 1000),
        });
      });

    async function switchContext(channelId, wantToWarn, remoteMessage) {
      switch (channelId) {
        case "missing-you":
          setLast(
            new Date(
              remoteMessage.sentTime - new Date().getTimezoneOffset() * 60000
            ).toISOString()
          );
          await AsyncStorage.setItem("last", String(remoteMessage.sentTime));
          wantToWarn && setReceived(true);
          break;
        case "message":
          RootNavigation.navigate("Interactions");
          break;
        default:
          break;
      }
    }

    // Clicar na notificacao com o app aberto em segundo plano

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      const channelId = remoteMessage.notification.android.channelId;
      await switchContext(channelId, false, remoteMessage);
    });

    // Clicar na notificacao com o app fechado

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          const channelId = remoteMessage.notification.android.channelId;
          await switchContext(channelId, false, remoteMessage);
        }
      });

    messaging().onMessage(async (remoteMessage) => {
      const channelId = remoteMessage.notification.android.channelId;
      await switchContext(channelId, true, remoteMessage);
    });

    return messaging().onTokenRefresh((token) => {
      api.post("/missing-you-register", {
        token,
        name,
      });
    });
  }, []);

  return (
    <GeralContext.Provider value={{ token, setToken, last, name }}>
      {props.children}
      {received && <ReceivedComponent speed={2} setReceived={setReceived} />}
    </GeralContext.Provider>
  );
};

export const useGeral = () => {
  return useContext(GeralContext);
};

export default GeralContextProvider;
