import { createSlice } from "@reduxjs/toolkit";
import CompareFunctions from "../utils/sort";
//files initial state
const initialState = {
  files: [],
};
//compare functions for js in built sort function
const compareService = new CompareFunctions();
//create slice
const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    //set files
    setFiles: (state, action) => {
      state.files = [...action.payload];
    },
    // sorting methods....
    sortFilesAlph: (state, action) => {
      const alphSortedFiles = [...action.payload].sort(
        compareService.compareAlphFilename
      );
      state.files = [...alphSortedFiles];
    },
    sortFilesAlphReverse: (state, action) => {
      const alphRevSortedFiles = [...action.payload].sort(
        compareService.compareAlphFilenameReverse
      );
      state.files = [...alphRevSortedFiles];
    },
    sortFilesUploadDate: (state, action) => {
      const uploadDateSortedFiles = [...action.payload].sort(
        compareService.compareUploadDate
      );
      state.files = [...uploadDateSortedFiles];
    },
    sortFilesUploadDateReverse: (state, action) => {
      const uploadDateRevSortedFiles = [...action.payload].sort(
        compareService.compareUploadDateReverse
      );
      state.files = [...uploadDateRevSortedFiles];
    },
    sortFilesExpireDate: (state, action) => {
      const expireDateSortedFiles = [...action.payload].sort(
        compareService.compareExpireDate
      );
      state.files = [...expireDateSortedFiles];
    },
    sortFilesExpireDateReverse: (state, action) => {
      const expireDateRevSortedFiles = [...action.payload].sort(
        compareService.compareExpireDateReverse
      );
      state.files = [...expireDateRevSortedFiles];
    },
    sortFilesMimeType: (state, action) => {
      const mimeTypeSortedFiles = [...action.payload].sort(
        compareService.compareMimeType
      );
      state.files = [...mimeTypeSortedFiles];
    },
    sortUploader: (state, action) => {
      const uploaderSortedFiles = [...action.payload].sort(
        compareService.compareUploader
      );
      state.files = [...uploaderSortedFiles];
    },
  },
});
//export reducer, actions
const { reducer, actions } = filesSlice;
export const {
  setFiles,
  sortFilesAlphReverse,
  sortFilesAlph,
  sortFilesUploadDate,
  sortFilesUploadDateReverse,
  sortFilesExpireDate,
  sortFilesExpireDateReverse,
  sortFilesMimeType,
  sortUploader,
} = actions;
export default reducer;
