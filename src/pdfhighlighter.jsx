import React, { useEffect, useState,useRef } from "react";
import { PDFDocument, rgb } from 'pdf-lib';
import NavBar from "./components/navbar/NavBar";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import HighlightCard from "./components/highlightCard/HighlightCard";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import UploadDropDown from "./components/upload/UploadDropDown";
const PdfHighlighter = ({ pdfBlob, highlights }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(0);
  const scrollContainerRef = useRef(null);
  const [pageHeight, setPageHeight] = useState(800);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const createPdfWithHighlights = async () => {
      if (pdfBlob) {
        const existingPdfBytes = await pdfBlob.arrayBuffer();
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        const pages = pdfDoc.getPages();
        setTotalPages(pages.length);
        console.log(`Total pages in PDF: ${pages.length}`);

        highlights.forEach(highlight => {
          const { pageIndex, top, left, width, height } = highlight;

          if (pageIndex < 0 || pageIndex >= pages.length) {
            console.warn(`Invalid pageIndex: ${pageIndex}. Skipping highlight.`);
            return;
          }

          const page = pages[pageIndex];

          if (page) {
            page.drawRectangle({
              x: left,
              y: page.getHeight() - top - height,
              width: width,
              height: height,
              color: rgb(1, 1, 0.5),
              opacity: 0.5,
            });
          } else {
            console.warn(`Page not found at index: ${pageIndex}`);
          }
        });

        const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
        setPdfUrl(pdfDataUri);
      }
    };

    createPdfWithHighlights();
  }, [pdfBlob, highlights]);
  const currentPageHighlights = highlights.filter(h => h.pageIndex === currentPage-1);
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const newPage = Math.floor(scrollTop / pageHeight) + 1;
    console.log(newPage)
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };
  const scrollToPage = (pageIndex) => {
    if (scrollContainerRef.current) {
      const scrollTop = pageIndex * pageHeight;
      scrollContainerRef.current.scrollTo({
        top: scrollTop,
        behavior: "smooth", 
      });
      setCurrentPage(pageIndex + 1); 
    }
  };
  const handleNextPage = () => {
    console.log(1)
    if (currentPage < totalPages) {
      scrollToPage(currentPage); 
      setCurrentPage(currentPage+1);
    }
  };


  const handlePreviousPage = () => {
    if (currentPage > 1) {
      scrollToPage(currentPage - 2);
      setCurrentPage(currentPage - 1);
    }
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UploadDropDown/>
        </Box>
      </Modal>
    <NavBar handleOpen={handleOpen}/>
      <div className="h-full  px-5 w-[100vw] mt-4">
        <div className="grid grid-cols-[60%_30%] gap-10 items-center justify-center">

          <div className="bg-white shadow-lg shadow-gray h-[80vh] flex justify-center items-center">
            <div  ref={scrollContainerRef}
        onScroll={handleScroll} 
        className="relative overflow-y-scroll h-full"
        
         style={{height: "80vh",width:"100%"}}>
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  title="PDF Viewer"
                  style={{
                     width: '100%',
            height: `${pageHeight * totalPages}px`, 
            border: 'none',
            position: 'relative',
                    top: 0,
                    left: 0,
                  }}
                />
              ) : (
                <p>Loading PDF...</p>
              )}
            </div>
          </div>


          <div className="bg-white shadow-lg shadow-gray h-[80vh] relative">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-900 text-lg p-3">
                Total Pages: <span className="text-gray-500"> {totalPages}</span>
              </h3>
              <div className="flex items-center justify-between p-3 gap-2">
                <ChevronLeftIcon
                  className={`text-gray-500 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                  onClick={handlePreviousPage}
                />
                <h3 className="text-gray-900 text-sm">{currentPage } / {totalPages}</h3>
                <ChevronRightIcon
                  className={`text-gray-500 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                  onClick={handleNextPage}
                />
              </div>
            </div>

            <Divider variant="middle" color="gray" />

            
            <div className="relative">
              {currentPageHighlights.length > 0 ? (
                currentPageHighlights.map((highlight, index) => (
                  <HighlightCard key={index} highlight={highlight} />
                ))
              ) : (
                <p className="text-center p-5 text-gray-500">No highlights on this page.</p>
              )}
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default PdfHighlighter;
