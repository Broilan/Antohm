import * as React from 'react';
import { useContext } from 'react';
import { DataContext } from '../App';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { AiFillCloseCircle } from 'react-icons/ai';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function MaterialModal(props) {
    const {open, setOpen} = useContext(DataContext)
    const component = props.component


  return (

    <div>

      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
            <button type="button" style={{backgroundColor:"transparent", border:"none", cursor:"pointer"}} onClick={(e) => setOpen(false)}><AiFillCloseCircle/></button>
         {component}
        </Box>
      </Modal>
    </div>
  );
}