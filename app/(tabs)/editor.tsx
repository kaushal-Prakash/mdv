import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "../../store/appStore";
import { darkColors, lightColors } from "../../constants/Colors";

export default function EditorScreen() {
  const { activeFile, updateFileContent, settings } = useAppStore();
  const colors = settings.darkMode ? darkColors : lightColors;

  const [content, setContent] = useState(activeFile?.content || "");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (activeFile) {
      const isModified = content !== activeFile.content;
      if (!isModified) {
        setContent(activeFile.content);
        setIsEditing(false);
      }
    } else {
      setContent("");
      setIsEditing(false);
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
    if (!isEditing && activeFile && newContent !== activeFile.content) {
      setIsEditing(true);
    }
    if (settings.autoSave && activeFile) {
      updateFileContent(activeFile.id, newContent);
    }
  };

  const handleCancel = () => {
    if (activeFile) {
      setContent(activeFile.content);
      setIsEditing(false);
    }
  };

  if (!activeFile) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.emptyState}>
          <Ionicons
            name="document-text"
            size={64}
            color={colors.textSecondary}
          />
          <Text style={[styles.emptyText, { color: colors.text }]}>
            No file selected
          </Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
            Select a file from the Explorer tab to start editing
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const modified = activeFile.content !== content;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.fileInfo}>
          <Ionicons name="document-text" size={20} color={colors.accent} />
          <Text style={[styles.fileName, { color: colors.text }]}>
            {activeFile.name}
          </Text>
          {modified && (
            <Text style={[styles.modifiedIndicator, { color: colors.accent }]}>
              {" "}
              ●
            </Text>
          )}
        </View>

        <View style={styles.actions}>
          {isEditing ? (
            <>
              <TouchableOpacity
                onPress={handleSave}
                style={[styles.saveButton, { backgroundColor: colors.accent }]}
              >
                <Ionicons name="save" size={18} color="white" />
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCancel}
                style={[
                  styles.cancelButton,
                  { borderColor: colors.textSecondary },
                ]}
              >
                <Text
                  style={[
                    styles.cancelButtonText,
                    { color: colors.textSecondary },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              style={[styles.editButton, { borderColor: colors.accent }]}
            >
              <Ionicons name="create" size={18} color={colors.accent} />
              <Text style={[styles.editButtonText, { color: colors.accent }]}>
                Edit
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <TextInput
          style={[
            styles.editor,
            { color: colors.text, backgroundColor: colors.background },
          ]}
          value={content}
          onChangeText={handleContentChange}
          multiline
          scrollEnabled={false}
          numberOfLines={settings.wordWrap ? undefined : 200} // A large number to prevent wrapping
          textAlignVertical="top"
          placeholder="Start writing your markdown..."
          placeholderTextColor={colors.textSecondary}
          autoCorrect={false}
          spellCheck={false}
        />
      </ScrollView>

      <View
        style={[
          styles.statusBar,
          { backgroundColor: colors.titleBar, borderTopColor: colors.border },
        ]}
      >
        <Text style={[styles.statusText, { color: colors.textSecondary }]}>
          {content.split("\n").length} lines • {content.length} characters
        </Text>
        <Text style={[styles.statusText, { color: colors.textSecondary }]}>
          Markdown
        </Text>
      </View>
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
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  modifiedIndicator: {
    fontSize: 20,
    marginLeft: 5,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  editButtonText: {
    marginLeft: 5,
    fontWeight: "600",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 10,
  },
  saveButtonText: {
    color: "white",
    marginLeft: 5,
    fontWeight: "600",
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  cancelButtonText: {
    fontWeight: "600",
  },
  editor: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    padding: 20,
    fontFamily: "monospace",
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
  },
  statusText: {
    fontSize: 12,
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
