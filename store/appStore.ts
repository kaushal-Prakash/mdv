import { create } from "zustand";

export interface File {
  id: string;
  name: string;
  content: string;
}

export interface AppSettings {
  darkMode: boolean;
  autoSave: boolean;
  wordWrap: boolean;
}

interface AppState {
  files: File[];
  activeFile: File | null;
  settings: AppSettings;
  setActiveFile: (fileId: string | null) => void;
  updateFileContent: (fileId: string, newContent: string) => void;
  toggleSetting: (key: keyof AppSettings) => void;
}

const initialFiles: File[] = [
  {
    id: "1",
    name: "welcome.md",
    content:
      "# Welcome to MDV\n\nThis is a demo file. You can switch themes in the settings tab!",
  },
  {
    id: "2",
    name: "cheatsheet.md",
    content: "## Markdown Cheatsheet\n\n- **Bold**\n- *Italic*\n- `Code`",
  },
];

export const useAppStore = create<AppState>((set, get) => ({
  files: initialFiles,
  activeFile: initialFiles[0] || null,
  settings: {
    darkMode: true,
    autoSave: false,
    wordWrap: true,
  },
  setActiveFile: (fileId) => {
    const file = get().files.find((f) => f.id === fileId) || null;
    set({ activeFile: file });
  },
  updateFileContent: (fileId, newContent) => {
    set((state) => ({
      files: state.files.map((file) =>
        file.id === fileId ? { ...file, content: newContent } : file
      ),
      activeFile:
        state.activeFile?.id === fileId
          ? { ...state.activeFile, content: newContent }
          : state.activeFile,
    }));
  },
  toggleSetting: (key) => {
    set((state) => ({
      settings: {
        ...state.settings,
        [key]: !state.settings[key],
      },
    }));
  },
}));
