import { StyleSheet, Dimensions } from "react-native";

import colors from "../../../colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.opacity_primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontFamily: "Nunito-Black",
    fontSize: 24,
    position: "absolute",
    width: "90%",
    textAlign: "left",
    top: Dimensions.get("screen").height * 0.085,
  },
  subtitle: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    textAlign: "center",
    color: "rgba(0,0,0,0.75)",
  },
  lastTitle: {
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 32,
    color: "white",
    marginBottom: 12,
  },
  lastDate: {
    fontFamily: "Nunito-Light",
    fontSize: 14,
  },
});
