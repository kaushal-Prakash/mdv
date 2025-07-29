import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAppStore } from "../../store/appStore";
import { darkColors, lightColors } from "../../constants/Colors";

export default function ExplorerScreen() {
  const { files, activeFile, setActiveFile, settings } = useAppStore();
  const colors = settings.darkMode ? darkColors : lightColors;

  const handleSelectFile = (fileId: string) => {
    setActiveFile(fileId);
    router.push("/(tabs)/editor");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.sidebar }}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          EXPLORER
        </Text>
      </View>
      <ScrollView>
        {files.map((file) => (
          <TouchableOpacity
            key={file.id}
            style={[
              styles.fileItem,
              { borderBottomColor: colors.border },
              activeFile?.id === file.id && {
                backgroundColor: colors.titleBar,
              },
            ]}
            onPress={() => handleSelectFile(file.id)}
          >
            <Ionicons
              name="document-text-outline"
              size={20}
              color={colors.textSecondary}
            />
            <Text style={[styles.fileName, { color: colors.text }]}>
              {file.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  fileName: {
    fontSize: 16,
    marginLeft: 15,
  },
});
