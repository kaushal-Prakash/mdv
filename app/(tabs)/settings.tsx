import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Switch,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "../../store/appStore";
import { darkColors, lightColors } from "../../constants/Colors";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];
type Colors = typeof darkColors;

// This component remains the same
const SettingItem = ({
  title,
  description,
  value,
  onToggle,
  icon,
  colors,
}: {
  title: string;
  description:string;
  value: boolean;
  onToggle: () => void;
  icon: IoniconName;
  colors: Colors;
}) => (
  <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
    <View style={styles.settingLeft}>
      <Ionicons name={icon} size={20} color={colors.accent} />
      <View style={styles.settingText}>
        <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
          {description}
        </Text>
      </View>
    </View>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: colors.border, true: colors.accent + "40" }}
      thumbColor={value ? colors.accent : colors.textSecondary}
      ios_backgroundColor={colors.border}
    />
  </View>
);


export default function SettingsScreen() {
  const { settings, toggleSetting } = useAppStore();
  const colors = settings.darkMode ? darkColors : lightColors;
    const handleNamePress = () => {
    const githubUrl = "https://github.com/kaushal-Prakash";
    Linking.openURL(githubUrl);
  };
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 1. Header (Stays at the top) */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          SETTINGS
        </Text>
      </View>

      {/* 2. ScrollView (Takes up the available space) */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.content}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Appearance
          </Text>
          <SettingItem
            title="Dark Mode"
            description="Use dark theme for the interface"
            value={settings.darkMode}
            onToggle={() => toggleSetting("darkMode")}
            icon="moon"
            colors={colors}
          />
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Editor
          </Text>
          <SettingItem
            title="Auto Save"
            description="Automatically save on edit"
            value={settings.autoSave}
            onToggle={() => toggleSetting("autoSave")}
            icon="save"
            colors={colors}
          />
          <SettingItem
            title="Word Wrap"
            description="Disable for horizontal scrolling"
            value={settings.wordWrap}
            onToggle={() => toggleSetting("wordWrap")}
            icon="swap-horizontal"
            colors={colors}
          />
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            About
          </Text>
          <View style={styles.aboutItem}>
            <Text style={[styles.aboutTitle, { color: colors.text }]}>
              MDV - Markdown Viewer
            </Text>
            <Text style={[styles.aboutVersion, { color: colors.accent }]}>
              Version 1.0.0
            </Text>
            {/* The "Made with..." part is removed from here */}
            <Text style={[styles.aboutDescription, { color: colors.textSecondary }]}>
              A VS Code-inspired markdown viewer and editor for React Native.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* 3. Footer (Stays at the bottom) */}
      <View style={styles.footerContainer}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          Made with{" "}
        </Text>
        <Ionicons
          name="heart"
          size={14}
          color={"red"}
        />
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          {" "}by{" "}
        </Text>
        <TouchableOpacity onPress={handleNamePress}>
          <Text style={[styles.footerText, { fontWeight: "600", color: colors.accent }]}>
            Kaushal Prakash
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    paddingBottom: 20, 
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 15,
    textTransform: "uppercase",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingDescription: {
    fontSize: 14,
    marginTop: 2,
  },
  aboutItem: {
    paddingVertical: 20,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  aboutVersion: {
    fontSize: 14,
    marginBottom: 10,
  },
  aboutDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',    
    justifyContent: 'center',
    padding: 20,
  },
});