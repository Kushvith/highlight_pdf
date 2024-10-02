import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const fileUploadSlices = createSlice({
    name: "fileUpload",
    initialState: {
        uploading: false,
        success: false,
        uploadError: null,
    },
    reducers: {
        uploadStart(state) {
            state.uploading = true;
            state.success = false;
            state.uploadError = null;
        },
        uploadSuccess(state, action) {
            state.uploading = false;
            state.success = action.payload;
            state.uploadError = null;
        },
        uploadError(state, action) {
            state.uploading = false;
            state.success = false;
          
            state.uploadError = action.payload;
        }
    }
});

// Export actions
export const { uploadStart, uploadSuccess, uploadError } = fileUploadSlices.actions;
export default fileUploadSlices.reducer;


export const uploadFile = (file) => async (dispatch) => {
    dispatch(uploadStart());

    const data = { pdf_base64: file };

    try {
        const response = await axios.post("http://192.168.1.105:8000/post-data", data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        dispatch(uploadSuccess(response.data));  

    } catch (error) {
        let serializedError = "An unknown error occurred.";

    
        if (axios.isAxiosError(error)) {
            serializedError = error.message; 
        }

        dispatch(uploadError(serializedError));
        console.error("Upload error:", serializedError); 
    }
};
