import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MarkdownDisplay from "react-native-markdown-display";
import { useAppStore } from "../../store/appStore";
import { darkColors, lightColors } from "../../constants/Colors";

export default function PreviewScreen() {
  const { activeFile, settings } = useAppStore();
  const colors = settings.darkMode ? darkColors : lightColors;

  const markdownStyles = StyleSheet.create({
    body: { color: colors.text, fontSize: 16 },
    heading1: {
      color: colors.accent,
      borderBottomWidth: 1,
      borderColor: colors.border,
      paddingBottom: 8,
      marginTop: 24,
      marginBottom: 16,
      fontWeight: "bold",
    },
    heading2: {
      color: colors.accent,
      borderBottomWidth: 1,
      borderColor: colors.border,
      paddingBottom: 6,
      marginTop: 20,
      marginBottom: 14,
      fontWeight: "bold",
    },
    code_inline: {
      backgroundColor: colors.titleBar,
      color: "#ce9178",
      padding: 2,
      borderRadius: 4,
      fontFamily: "monospace",
    },
    code_block: {
      backgroundColor: colors.titleBar,
      borderColor: colors.border,
      padding: 16,
      borderRadius: 6,
      color: "#ce9178",
      fontFamily: "monospace",
    },
    blockquote: {
      backgroundColor: colors.titleBar,
      borderColor: colors.accent,
      borderLeftWidth: 4,
      padding: 10,
      marginVertical: 10,
    },
    link: { color: colors.accent, textDecorationLine: "underline" },
    list_item: { marginVertical: 4 },
  });

  if (!activeFile) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.emptyState}>
          <Ionicons name="eye-off" size={64} color={colors.textSecondary} />
          <Text style={[styles.emptyText, { color: colors.text }]}>
            No preview available
          </Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
            Select a markdown file to see the preview
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.fileInfo}>
          <Ionicons name="eye" size={20} color={colors.accent} />
          <Text style={[styles.fileName, { color: colors.text }]}>
            {activeFile.name} - Preview
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.markdownContainer}>
        <MarkdownDisplay style={markdownStyles}>
          {activeFile.content}
        </MarkdownDisplay>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  fileName: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  markdownContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
});
