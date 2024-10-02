import React, {useState,useCallback} from 'react';
import { Upload } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../../Redux/slices/fileUploadSlices';
const UploadDropDown = ({ setPdfBlob, setHighlights }) => {
    const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  
 

  const dispatch = useDispatch();
  const {uploading, success, uploadError} = useSelector((state) => state.fileUpload);
  const handleDrop = useCallback((event)=>{
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const pdfFiles = droppedFiles.filter(file => file.type === "application/pdf");
    if (pdfFiles.length > 0) {
        setFile(pdfFiles[0]); 
        setError(""); 
      } else {
        setError("Please upload a valid PDF file.");
      }
  },[])
  const handleDragOver = (event) => {
    event.preventDefault(); 
  };
  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64File = reader.result.split(',')[1];
        console.log(base64File);
        dispatch(uploadFile(base64File));
   
      };
    }
  };

  const handleRemove = () => {
    setFile(null); 
  };
  return (
    <>
    <h4 className='text-black text-xl p-2 text-center cursor-pointer'>Upload Pdf Files</h4>
    <div
    onDrop={handleDrop}
    onDragOver={handleDragOver}
    className="border-2 border-dashed border-gray-400 p-5 rounded-md flex flex-col items-center mt-3 justify-center cursor-pointer"
    >
        <Upload/>
        <h3 className="text-gray-700">Drag & drop your PDF here</h3>
        <p className="text-gray-500">or click to select a file</p>
        {file && (
        <div className="mt-3 text-gray-800">
          <p>Uploaded File: {file.name}</p>
          <button onClick={handleRemove} className="text-red-500">Remove</button>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}

      {success && <p className="text-green-500 mt-2">File uploaded successfully</p>}
    </div>
    <button className='bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded' onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
    </>
  );
}
export default UploadDropDown;