import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Divider from '@mui/material/Divider';
const HighlightCard = ({ highlight, key }) => {
   return ( <><div className='flex flex-col gap-2 p-3'>
    <div className='flex justify-between items-center'>
        <p className='text-gray text-sm'>Page Index: {highlight.pageIndex}</p>
        <div className='flex items-center gap-2'>
            <ErrorOutlineIcon className='text-[#ff0000] text-sm' style={{ fontSize: '1rem' }} />
            <p className='text-[#ff0000]'>invalid text</p>
        </div>
    </div>
    <div>
        <p className='text-gray'>{highlight.text}</p>
    </div>
</div>
<Divider variant="middle" />
</>
);
}

export default HighlightCard;