import React, { useState } from "react";
import './addProjectModal.css'
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";

interface AddProjectModalProps {
  idToken: string;
  getData: ()=> void
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({idToken, getData}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  

  const boxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      try {
        const response = await axios ({
          method: 'post',
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          url: 'http://byrdbox-env.eba-4kxk4yka.eu-north-1.elasticbeanstalk.com/projects/create',
          data: {
            title,
            description
          },
      })
      if (response.status === 200 && response.statusText === 'OK'){
        setOpen(false);
        getData();
      }
       
      } catch (err) {
        console.error('Ann error occurred in adding a new project:', err)
      }
    }
  }

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add Project
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <form onSubmit={handleSubmit} className="form">
            <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
              Add a new project
            </Typography>
            <TextField
              label="title"
              value={title}
              id="title"
              variant="outlined"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <TextField
              label="description"
              value={description}
              id="description"
              variant="outlined"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
            />
            <Button type="submit" variant="contained"> Add </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddProjectModal;
