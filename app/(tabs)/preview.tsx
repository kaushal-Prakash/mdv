// app/(tabs)/preview.tsx

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MarkdownDisplay from 'react-native-markdown-display'; // Import the new library
import { useFileStore } from '../../store/fileStore';
import { colors } from '../../constants/Colors';

export default function PreviewScreen() {
  const { activeFile } = useFileStore();

  if (!activeFile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Ionicons name="eye-off" size={64} color={colors.textSecondary} />
          <Text style={styles.emptyText}>No preview available</Text>
          <Text style={styles.emptySubtext}>
            Select a markdown file to see the preview
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.fileInfo}>
          <Ionicons name="eye" size={20} color={colors.accent} />
          <Text style={styles.fileName}>{activeFile.name} - Preview</Text>
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
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  markdownContainer: {
    padding: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  emptySubtext: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});

// Custom styles for the markdown content
const markdownStyles = StyleSheet.create({
  body: {
    color: colors.text,
    fontSize: 16,
  },
  heading1: {
    color: colors.accent,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingBottom: 8,
    marginTop: 24,
    marginBottom: 16,
  },
  heading2: {
    color: colors.accent,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingBottom: 6,
    marginTop: 20,
    marginBottom: 14,
  },
  code_inline: {
    backgroundColor: colors.titleBar,
    color: '#ce9178',
  },
  code_block: {
    backgroundColor: colors.titleBar,
    borderColor: colors.border,
    padding: 16,
    borderRadius: 6,
    color: '#ce9178',
  },
  blockquote: {
    backgroundColor: colors.titleBar,
    borderColor: colors.accent,
    borderLeftWidth: 4,
    padding: 10,
  },
});