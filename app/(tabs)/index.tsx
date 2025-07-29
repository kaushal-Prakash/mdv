import React, { useEffect } from 'react'; // Import useEffect
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Linking from 'expo-linking'; // Import Linking
import * as FileSystem from 'expo-file-system'; // Import FileSystem
import { useAppStore, File } from '../../store/appStore'; // Import File type
import { darkColors, lightColors } from '../../constants/Colors';

export default function ExplorerScreen() {
  const { files, activeFile, setActiveFile, settings, addFile } = useAppStore();
  const colors = settings.darkMode ? darkColors : lightColors;

  useEffect(() => {
    const handleIncomingFile = async (url: string) => {
      if (!url) return;

      try {
        const content = await FileSystem.readAsStringAsync(url);
        const filename = url.split('/').pop() || 'new-file.md';

        const newFile: File = {
          id: Date.now().toString(), 
          name: decodeURIComponent(filename),
          content: content,
        };

        addFile(newFile);
        setActiveFile(newFile.id);

        router.push('/(tabs)/editor');

      } catch (e) {
        console.error('Failed to read file:', e);
      }
    };

    Linking.getInitialURL().then(url => {
      if (url) {
        handleIncomingFile(url);
      }
    });

    const subscription = Linking.addEventListener('url', event => {
      handleIncomingFile(event.url);
    });

    return () => {
      subscription.remove();
    };
  }, []);


  const handleSelectFile = (fileId: string) => {
    setActiveFile(fileId);
    router.push('/(tabs)/editor');
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
