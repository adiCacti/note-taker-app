import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface INote {
  id: string;
  title: string;
  note: string;
  bgColor: string;
  images: string[];
  isPinned: boolean;
  inTrash: boolean;
  inArchive: boolean;
}

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [] as INote[],
  },
  reducers: {
    addNote: (state: any, action: PayloadAction<INote>) => {
      let newNote = {
        ...action.payload,
      };
      state.notes.push(newNote);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      let { notes } = state;
      const id = action.payload;
      state.notes = notes.filter((item) => item.id !== id);
    },
    updateNote: (state, action: PayloadAction<INote>) => {
      let { notes } = state;
      state.notes = notes.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { addNote, deleteNote, updateNote } = notesSlice.actions;

export const selectedNotes = (state: RootState) => state.notes.notes;

export default notesSlice.reducer;
