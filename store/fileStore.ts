// store/fileStore.ts

import { create } from 'zustand';

export interface File {
  id: string;
  name: string;
  content: string;
}

interface FileState {
  files: File[];
  activeFile: File | null;
  setActiveFile: (fileId: string | null) => void;
  updateFileContent: (fileId: string, newContent: string) => void;
}

// Example initial data
const initialFiles: File[] = [
  { id: '1', name: 'welcome.md', content: '# Welcome to MDV\n\nThis is a demo file. Select another file or start editing!' },
  { id: '2', name: 'cheatsheet.md', content: '## Markdown Cheatsheet\n\n- **Bold**\n- *Italic*\n- `Code`' },
];

export const useFileStore = create<FileState>((set, get) => ({
  files: initialFiles,
  activeFile: initialFiles[0] || null,
  setActiveFile: (fileId) => {
    const file = get().files.find(f => f.id === fileId) || null;
    set({ activeFile: file });
  },
  updateFileContent: (fileId, newContent) => {
    set(state => ({
      files: state.files.map(file =>
        file.id === fileId ? { ...file, content: newContent } : file
      ),
      // Also update activeFile if it's the one being edited
      activeFile: state.activeFile?.id === fileId
        ? { ...state.activeFile, content: newContent }
        : state.activeFile,
    }));
  },
}));