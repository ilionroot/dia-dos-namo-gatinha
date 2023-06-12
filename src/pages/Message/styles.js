import { StyleSheet } from "react-native";

import colors from "../../../colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
    backgroundColor: colors.opacity_primary,
  },
  messageContainer: {
    width: "100%",
    flex: 1,
    padding: 32,
  },
  messageText: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 24,
    padding: 32,
  },
  header: {
    position: "absolute",
    left: 0,
    top: 0,
    padding: 48,
    paddingLeft: 24,
  },
});
