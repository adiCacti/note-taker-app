import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface NoteState {
  title: string;
  note: string;
  bgColor: string;
  images: string[];
  isPinned: boolean;
  inTrash: boolean;
  inArchive: boolean;
}

const initialState: NoteState = {
  title: "Yolo",
  note: "Yolo me",
  bgColor: "#1F2025",
  images: [],
  isPinned: false,
  inTrash: false,
  inArchive: false,
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateNote: (state, action: PayloadAction<string>) => {
      state.note = action.payload;
    },
    updateBgColor: (state, action: PayloadAction<string>) => {
      state.bgColor = action.payload;
    },
    addImages: (state, action: PayloadAction<string>) => {},
    removeImages: (state, action: PayloadAction<string>) => {},
    addInTrash: (state) => {
      state.inTrash = true;
    },
    removeFromTrash: (state) => {
      state.inTrash = false;
    },
    addInArchive: (state) => {
      state.inArchive = true;
    },
    removeFromArchive: (state) => {
      state.inArchive = false;
    },
    addNoteToPinned: (state) => {
      state.isPinned = true;
    },
    removeNoteFromPinned: (state) => {
      state.isPinned = false;
    },
  },
});

export const {
  updateTitle,
  updateNote,
  updateBgColor,
  addImages,
  removeImages,
  addInTrash,
  removeFromTrash,
  addInArchive,
  removeFromArchive,
  addNoteToPinned,
  removeNoteFromPinned,
} = noteSlice.actions;

export const selectTitle = (state: RootState) => state.note.title;
export const selectNote = (state: RootState) => state.note.note;
export const selectBgColor = (state: RootState) => state.note.bgColor;
export const selectImages = (state: RootState) => state.note.images;
export const selectIsPinned = (state: RootState) => state.note.isPinned;
export const selectInTrash = (state: RootState) => state.note.inTrash;
export const selectInArchive = (state: RootState) => state.note.inArchive;

export default noteSlice.reducer;
