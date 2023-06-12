import { StyleSheet } from "react-native";

import colors from "../../../colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 52,
    backgroundColor: colors.opacity_primary,
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
  },
  messagesContainer: {
    flex: 1,
    marginTop: 16,
    marginBottom: 112,
    paddingHorizontal: 32,
  },
  message: {
    backgroundColor: "rgba(255,255,255,0.85)",
    width: "100%",
    height: 100,
    borderRadius: 24,
    marginVertical: 8,
    padding: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  messageText: {
    fontSize: 17,
    color: "rgba(0,0,0,0.85)",
    marginLeft: 20,
    flex: 1,
  },
  continueText: {
    color: "rgba(0,0,0,0.35)",
    fontFamily: "Nunito-Italic",
  },

  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,64,32,0.25)",
  },
  modalContent: {
    backgroundColor: "rgba(255,255,255,1)",
    width: "85%",
    height: "50%",
    elevation: 5,
    borderRadius: 24,
    padding: 24,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    borderBottomColor: "rgba(0,0,0,0.15)",
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
  },
  createButton: {
    padding: 24,
    backgroundColor: colors.primary,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  createButtonText: {
    color: "rgba(255,255,255,0.85)",
    fontFamily: "Nunito-Black",
    fontSize: 18,
  },
});
