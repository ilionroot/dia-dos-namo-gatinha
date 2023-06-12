import { StyleSheet } from "react-native";

import colors from "../../../colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 52,
    backgroundColor: colors.opacity_primary,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "Nunito-Black",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    justifyContent: "space-between",
    position: "absolute",
    top: 52,
    width: "100%",
  },
  camContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    overflow: "hidden",
    borderRadius: 64,
    width: "90%",
    height: "70%",
  },
  cam: {
    flex: 1,
  },
  preview: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    borderRadius: 64,
  },
  takePictureButton: {
    width: 75,
    height: 75,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 37.5,
    position: "absolute",
    bottom: 24,
    elevation: 1,
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 32,
    paddingHorizontal: 24,
  },
  actionButton: {
    width: 100,
    backgroundColor: colors.primary,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    elevation: 1,
  },
  backText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.85)",
  },
  loader: {
    marginRight: 32,
  },
});
