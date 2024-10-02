import {configureStore} from "@reduxjs/toolkit";
import fileUploadSlices from "./slices/fileUploadSlices";

export const store = configureStore({
    reducer: {
        fileUpload: fileUploadSlices
    }
})