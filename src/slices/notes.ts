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
export interface INotes {
  notes: INote[];
}

const initialState: INotes = {
  notes: [],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state: any, action: PayloadAction<INote>) => {
      // const data = state.notes;
      // console.log(data, "states\n", action.payload, "action");
      // return [...state.notes, action.payload] as any;
      state.notes.push(action.payload);
      state.notes = [...state.notes];
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((item) => item.id !== action.payload);
    },
    updateNote: (state, action: PayloadAction<INote>) => {
      state.notes.map((item) => {
        if (item.id === action.payload.id) return action.payload as INote;
        else item as INote;
      });
    },
  },
});

export const { addNote, deleteNote, updateNote } = notesSlice.actions;

export const selectedNotes = (state: RootState) => state.notes.notes;

export default notesSlice.reducer;
