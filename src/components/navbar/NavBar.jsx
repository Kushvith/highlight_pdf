import React from "react";
import "./NavBar.css";
import UploadFileIcon from '@mui/icons-material/UploadFile';
const NavBar = ({handleOpen})=>{
    return(
        <nav className="navbar bg-white w-[95vw] h-[10vh] m-auto mt-5 rounded-lg shadow-lg shadow-gray">
           <div className="flex items-center justify-between w-full h-full px-5">
                <h1 className="text-3xl font-bold tracking-wide text-center">
                    <span className="text-blue-500">Pdf</span> Comparision
                </h1>
                <div onClick={handleOpen} className="flex flex-col items-center cursor-pointer text-black-500 hover:text-blue-600 text-center">
                    <UploadFileIcon  style={{fontSize: "1.5rem"}}/>
                    <p>Upload File</p>
                </div>
            </div>
        </nav>
    );
}
export default NavBar;