import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";


const Askgroupdelete = ({open,close,handleDelete,isLoading}) => {

  return (
    
<Dialog
      open={open}
      onClose={close}
      PaperProps={{
        style: {
          backgroundColor: "white", 
          padding: "20px",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>Delete this group?</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "#000" }}>
          Are you sure you want to delete this group? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={close}
          variant="outlined"
          color="error"
          disabled={isLoading}
          sx={{ fontWeight: "bold" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="success"
          disabled={isLoading}
          sx={{ fontWeight: "bold" }}
        >
          Delete group
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Askgroupdelete
