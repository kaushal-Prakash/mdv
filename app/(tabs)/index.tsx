// app/(tabs)/index.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFileStore } from '../../store/fileStore';
import { colors } from '../../constants/Colors';
import { router } from 'expo-router';

export default function ExplorerScreen() {
  const { files, activeFile, setActiveFile } = useFileStore();

  const handleSelectFile = (fileId: string) => {
    setActiveFile(fileId);
    router.push('/(tabs)/editor'); // Navigate to editor after selecting
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EXPLORER</Text>
      </View>
      <ScrollView>
        {files.map((file) => (
          <TouchableOpacity
            key={file.id}
            style={[
              styles.fileItem,
              activeFile?.id === file.id && styles.activeFileItem,
            ]}
            onPress={() => handleSelectFile(file.id)}
          >
            <Ionicons name="document-text-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.fileName}>{file.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sidebar,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activeFileItem: {
    backgroundColor: colors.titleBar,
  },
  fileName: {
    color: colors.text,
    fontSize: 16,
    marginLeft: 15,
  },
});