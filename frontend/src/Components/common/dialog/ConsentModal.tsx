import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export interface UserConsentModalInterface {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  title: string;
  content: string;
}

export default function UserConsentModal(props: UserConsentModalInterface) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Disagree</Button>
        <Button onClick={props.onAccept} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
