import { create } from 'zustand';

interface FileItem {
  id: string;
  name: string;
  content: string;
  type: 'file' | 'folder';
  children?: FileItem[];
}

interface FileStore {
  files: FileItem[];
  activeFile: FileItem | null;
  setFiles: (files: FileItem[]) => void;
  setActiveFile: (file: FileItem | null) => void;
  updateFileContent: (id: string, content: string) => void;
  addFile: (file: FileItem) => void;
}

export const useFileStore = create<FileStore>((set) => ({
  files: [],
  activeFile: null,
  setFiles: (files) => set({ files }),
  setActiveFile: (file) => set({ activeFile: file }),
  updateFileContent: (id, content) =>
    set((state) => {
      const updateFile = (files: FileItem[]): FileItem[] =>
        files.map((file) => {
          if (file.id === id) {
            return { ...file, content };
          }
          if (file.children) {
            return { ...file, children: updateFile(file.children) };
          }
          return file;
        });

      const updatedFiles = updateFile(state.files);
      const updatedActiveFile = state.activeFile?.id === id 
        ? { ...state.activeFile, content }
        : state.activeFile;

      return {
        files: updatedFiles,
        activeFile: updatedActiveFile,
      };
    }),
  addFile: (file) =>
    set((state) => ({
      files: [...state.files, file],
    })),
}));