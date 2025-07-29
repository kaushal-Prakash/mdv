import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const colors = {
  background: '#1e1e1e',
  sidebar: '#252526',
  titleBar: '#323233',
  accent: '#007acc',
  text: '#cccccc',
  textSecondary: '#969696',
  border: '#3e3e42',
};

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    darkMode: true,
    autoSave: true,
    syntaxHighlighting: true,
    wordWrap: true,
    showLineNumbers: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const SettingItem = ({ 
    title, 
    description, 
    value, 
    onToggle, 
    icon 
  }: {
    title: string;
    description: string;
    value: boolean;
    onToggle: () => void;
    icon: string;
  }) => (
    <View style={settingsStyles.settingItem}>
      <View style={settingsStyles.settingLeft}>
        <Ionicons name={icon as any} size={20} color={colors.accent} />
        <View style={settingsStyles.settingText}>
          <Text style={settingsStyles.settingTitle}>{title}</Text>
          <Text style={settingsStyles.settingDescription}>{description}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: colors.accent + '40' }}
        thumbColor={value ? colors.accent : colors.textSecondary}
      />
    </View>
  );

  return (
    <SafeAreaView style={settingsStyles.container}>
      <View style={settingsStyles.header}>
        <Text style={settingsStyles.headerTitle}>SETTINGS</Text>
      </View>

      <ScrollView style={settingsStyles.content}>
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>Appearance</Text>
          
          <SettingItem
            title="Dark Mode"
            description="Use dark theme for the interface"
            value={settings.darkMode}
            onToggle={() => toggleSetting('darkMode')}
            icon="moon"
          />
          
          <SettingItem
            title="Syntax Highlighting"
            description="Highlight markdown syntax in editor"
            value={settings.syntaxHighlighting}
            onToggle={() => toggleSetting('syntaxHighlighting')}
            icon="color-palette"
          />
          
          <SettingItem
            title="Show Line Numbers"
            description="Display line numbers in editor"
            value={settings.showLineNumbers}
            onToggle={() => toggleSetting('showLineNumbers')}
            icon="list"
          />
        </View>

        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>Editor</Text>
          
          <SettingItem
            title="Auto Save"
            description="Automatically save changes"
            value={settings.autoSave}
            onToggle={() => toggleSetting('autoSave')}
            icon="save"
          />
          
          <SettingItem
            title="Word Wrap"
            description="Wrap long lines in editor"
            value={settings.wordWrap}
            onToggle={() => toggleSetting('wordWrap')}
            icon="wrap"
          />
        </View>

        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>About</Text>
          
          <View style={settingsStyles.aboutItem}>
            <Text style={settingsStyles.aboutTitle}>MDV - Markdown Viewer</Text>
            <Text style={settingsStyles.aboutVersion}>Version 1.0.0</Text>
            <Text style={settingsStyles.aboutDescription}>
              A VS Code-inspired markdown viewer and editor for React Native
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  content: {
    flex: 1,
  },
  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  settingDescription: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  aboutItem: {
    paddingVertical: 20,
  },
  aboutTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  aboutVersion: {
    color: colors.accent,
    fontSize: 14,
    marginBottom: 10,
  },
  aboutDescription: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});