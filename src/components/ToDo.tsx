import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, IconButton } from "@mui/material";
import Swal from "sweetalert2";

import actions from "../actions";
import { writeFile, deleteFile } from "../fileIO";
import { GlobalContext } from "../contexts/GlobalContext";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const singleToDoStyle = {
  width: "100%",
  background: "#6395a3",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#49727e",
  },
};

const ModalStyle = {
  width: "100%",
};

const buttonsMdalStyle = {
  display: "flex",
  justifyContent: "space-around",
  marginTop: "1.5rem",
};

const buttonCreateToDoStyle = {
  background: "#6376B0",
  color: "#ffffff",
  marginBottom: "20px",
};

/* 
{
    title:""
    content:""
}

*/

export default function ToDo({
  id,
  title: tf,
  content: tc,
  type,
}: {
  id?: string;
  title: string;
  content: string;
  type: string;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(tf);
  const [content, setContent] = useState(tc);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { loadAlltFiles } = useContext(GlobalContext)!;

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  async function executeAction(action: string) {
    if (/^\s*$/.test(title)) {
      console.log("escriba un titulo");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must write a title!",
      });
      handleClose();
      return;
    }

    if (/^\s*$/.test(content)) {
      console.log("escriba un titulo");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must write a content!",
      });
      handleClose();
      return;
    }

    if (action === actions.create) {
      console.log("here");
      try {
        console.log(title, content, "---");
        await writeFile(title, content);
        await loadAlltFiles();
        handleClose();
        Swal.fire({
          icon: "success",
          title: "Successfully",
          text: "ToDo created successfully!",
        });
      } catch (err) {
        console.error("Error in create a file");
      }
      return;
    }

    if (action === actions.edit) {
      try {
        console.log(title, content, "-editing--");
        await writeFile(title, content);
        await loadAlltFiles();
        handleClose();
        Swal.fire({
          icon: "success",
          title: "Successfully",
          text: "ToDo edited successfully!",
        });
      } catch (err) {
        console.error("Error in editing a file");
      }
      return;
    }
  }

  return (
    <div>
      {type === "edit" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <Button onClick={handleOpen} sx={singleToDoStyle}>
            {title.toUpperCase()}
          </Button>
          <IconButton
            sx={{
              "&:hover, & .Mui-focusVisible": {
                backgroundColor: "rgb(10, 89, 109)",
                color: "white",
              },
            }}
            onClick={async () => {
              await deleteFile(id);
              await loadAlltFiles();
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      ) : (
        <button
          onClick={() => {
            setTitle("");
            setContent("");
            handleOpen();
          }}
          style={buttonCreateToDoStyle}
        >
          Create toDo
        </button>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ width: "90vw" }}
      >
        <Box sx={style}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Title"
            fullWidth
            sx={{ marginBottom: "1rem" }}
            value={title}
            onChange={(e) => setTitle(capitalize(e.target.value))}
          />
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={8}
            placeholder="Give me a ToDo"
            fullWidth
            value={content}
            onChange={(e) => setContent(capitalize(e.target.value))}
          />
          <div style={buttonsMdalStyle}>
            <Button
              variant="contained"
              color="warning"
              sx={{ width: "35%" }}
              onClick={() => {
                setTitle(tf);
                setContent(tc);
                handleClose();
              }}
            >
              Discard
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ width: "35%" }}
              onClick={(e) => executeAction(type)}
            >
              {type.toUpperCase()}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
