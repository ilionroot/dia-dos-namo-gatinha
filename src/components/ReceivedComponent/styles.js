import { StyleSheet } from "react-native";
import colors from "../../../colors";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.9)",
    padding: 32,
    paddingTop: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontFamily: "Nunito-Bold",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 16,
  },
  adivinha: {
    fontSize: 24,
    fontFamily: "Nunito-Italic",
    color: "white",
    textAlign: "center",
    opacity: 0.75,
  },
  animation: {
    width: 200,
    height: 200,
  },
  block: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    top: "10%",
  },
  contribuirButton: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
    position: "absolute",
    bottom: "15%",
  },
  contribuirButtonText: {
    color: "white",
    fontFamily: "Nunito-Bold",
    fontSize: 16,
  },
});
