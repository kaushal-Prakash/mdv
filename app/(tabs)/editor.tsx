// app/(tabs)/editor.tsx

import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFileStore } from '../../store/fileStore';
import { colors } from '../../constants/Colors';

export default function EditorScreen() {
  const { activeFile, updateFileContent } = useFileStore();
  const [content, setContent] = useState(activeFile?.content || '');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (activeFile) {
      setContent(activeFile.content);
      setIsEditing(false);
    } else {
      setContent('');
    }
  }, [activeFile]);

  const handleSave = () => {
    if (activeFile) {
      updateFileContent(activeFile.id, content);
      setIsEditing(false);
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  if (!activeFile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Ionicons name="document-text" size={64} color={colors.textSecondary} />
          <Text style={styles.emptyText}>No file selected</Text>
          <Text style={styles.emptySubtext}>
            Select a file from the Explorer tab to start editing
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.fileInfo}>
          <Ionicons name="document-text" size={20} color={colors.accent} />
          <Text style={styles.fileName}>{activeFile.name}</Text>
          {isEditing && <Text style={styles.modifiedIndicator}> ●</Text>}
        </View>
        
        <View style={styles.actions}>
          {isEditing ? (
            <>
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Ionicons name="save" size={18} color="white" />
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  setContent(activeFile.content);
                  setIsEditing(false);
                }} 
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity 
              onPress={() => setIsEditing(true)} 
              style={styles.editButton}
            >
              <Ionicons name="create" size={18} color={colors.accent} />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isEditing ? (
        <TextInput
          style={styles.editor}
          value={content}
          onChangeText={handleContentChange}
          multiline
          textAlignVertical="top"
          placeholder="Start writing your markdown..."
          placeholderTextColor={colors.textSecondary}
          autoCorrect={false}
          spellCheck={false}
        />
      ) : (
        <ScrollView style={styles.viewer}>
          <Text style={styles.sourceText}>{activeFile.content}</Text>
        </ScrollView>
      )}

      <View style={styles.statusBar}>
        <Text style={styles.statusText}>
          {activeFile.content.split('\n').length} lines • {activeFile.content.length} characters
        </Text>
        <Text style={styles.statusText}>Markdown</Text>
      </View>
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
  modifiedIndicator: {
    color: colors.accent,
    fontSize: 20,
    marginLeft: 5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  editButtonText: {
    color: colors.accent,
    marginLeft: 5,
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 10,
  },
  saveButtonText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: '600',
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.textSecondary,
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  editor: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
    padding: 20,
    fontFamily: 'monospace',
  },
  viewer: {
    flex: 1,
  },
  sourceText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
    padding: 20,
    fontFamily: 'monospace',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.titleBar,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statusText: {
    color: colors.textSecondary,
    fontSize: 12,
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