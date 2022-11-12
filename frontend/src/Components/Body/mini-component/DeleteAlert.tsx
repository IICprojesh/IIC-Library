import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteAlert(props: any) {
  const [open, setOpen] = React.useState(true);

  const handleAgree = () => {
    props.onPremission(true)
    setOpen(false);
  };

  const handleDisAgree = () => {
    props.onPremission(false)
    setOpen(false);
  };
  console.log("i got hit here");
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do You Really want ot Delete ? Delete Data on your won risk, Once
            the data is deleted it cannot be recoverd back.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisAgree}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus> Agree  </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
