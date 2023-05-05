import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const singleToDoStyle = {
    width: "100%",
    background:"#6395a3",
    color:"#ffffff",
    marginBottom:"15px",
    "&:hover":{
      backgroundColor:"#49727e"
    }
}

const ModalStyle = {
    width:"100%"
}

const buttonsMdalStyle ={
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: "1.5rem"
}

/* 
{
    title:""
    content:""
}

*/

export default function ToDo({title:tf,content:tc}:{title:String, content:String}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(tf)
  const [content, setContent] = useState(tc)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function capitalize(str:string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div>
      <Button onClick={handleOpen} sx={singleToDoStyle}>{title.toUpperCase()}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{width:"90vw"}}
      >
        <Box sx={style}>
        <TextField 
        id="outlined-basic" 
        variant="outlined"
        placeholder='Title'
        fullWidth
        sx={{marginBottom:"1rem"}}
        value={title}
        onChange={(e)=>setTitle(capitalize(e.target.value))}
        />
          <TextField
          id="outlined-multiline-static"
          multiline
          rows={8}
          placeholder='Give me a ToDo'
          fullWidth
          value={content}
          onChange={(e)=>setContent(capitalize(e.target.value))}
          />
        <div style={buttonsMdalStyle}>
        <Button variant="contained" color='warning' sx={{width:"35%"}} onClick={handleClose}>Discard</Button>
        <Button variant="contained" color='success' sx={{width:"35%"}}>Edit</Button>
        </div>
        </Box>
      </Modal>

    </div>
  );
}