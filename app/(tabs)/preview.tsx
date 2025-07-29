import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useFileStore } from '../../store/fileStore';

const colors = {
  background: '#1e1e1e',
  sidebar: '#252526',
  titleBar: '#323233',
  accent: '#007acc',
  text: '#cccccc',
  textSecondary: '#969696',
  border: '#3e3e42',
};

export default function PreviewScreen() {
  const { activeFile } = useFileStore();

  const renderMarkdownHTML = (content: string) => {
    let html = content
      .replace(/### (.*)/g, '<h3 style="color: #569cd6; margin: 20px 0 10px 0;">$1</h3>')
      .replace(/## (.*)/g, '<h2 style="color: #4ec9b0; margin: 25px 0 15px 0;">$1</h2>')
      .replace(/# (.*)/g, '<h1 style="color: #dcdcaa; margin: 30px 0 20px 0;">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #569cd6;">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em style="color: #ce9178;">$1</em>')
      .replace(/`(.*?)`/g, '<code style="background: #2d2d30; padding: 2px 4px; border-radius: 3px; color: #ce9178;">$1</code>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre style="background: #2d2d30; padding: 15px; border-radius: 5px; overflow-x: auto; margin: 15px 0;"><code style="color: #ce9178;">$2</code></pre>')
      .replace(/> (.*)/g, '<blockquote style="border-left: 4px solid #007acc; padding-left: 15px; margin: 15px 0; color: #969696; font-style: italic;">$1</blockquote>')
      .replace(/^\d+\. (.*)/gm, '<li style="margin: 5px 0;">$1</li>')
      .replace(/^- (.*)/gm, '<li style="margin: 5px 0; list-style-type: disc;">$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #007acc; text-decoration: none;">$1</a>')
      .replace(/\n/g, '<br>');

    // Handle tables
    html = html.replace(/\|(.+)\|/g, (match, content) => {
      const cells = content.split('|').map((cell: string) => cell.trim());
      const cellsHtml = cells.map((cell: string) => `<td style="padding: 8px; border: 1px solid #3e3e42;">${cell}</td>`).join('');
      return `<tr>${cellsHtml}</tr>`;
    });

    if (html.includes('<tr>')) {
      html = html.replace(/(<tr>.*<\/tr>)/s, '<table style="border-collapse: collapse; margin: 15px 0; width: 100%;">$1</table>');
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #1e1e1e;
            color: #cccccc;
            padding: 20px;
            line-height: 1.6;
            margin: 0;
          }
          h1, h2, h3 { font-weight: 600; }
          table { width: 100%; }
          pre { white-space: pre-wrap; }
          ul, ol { padding-left: 20px; }
        </style>
      </head>
      <body>${html}</body>
      </html>
    `;
  };

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
        
        <TouchableOpacity style={styles.refreshButton}>
          <Ionicons name="refresh" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <WebView
        style={styles.webview}
        source={{ html: renderMarkdownHTML(activeFile.content) }}
        backgroundColor={colors.background}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const previewStyles = StyleSheet.create({
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
  refreshButton: {
    padding: 8,
  },
  webview: {
    flex: 1,
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