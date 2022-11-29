import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import LanguageIcon from "@mui/icons-material/Language";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_ENDPOINT } from "../../../../constants/constants";

export default function FormDialog(props: any) {
  const [isEdit, setIsEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    setData((prev: any) => {
      if (props.datas) {
        setIsEdit(true);
        return props.datas;
      }
      return prev;
    });
  }, [props.datas]);

  const addStudent = () => {
    axios({
      method: "post",
      url: `${BACKEND_ENDPOINT}/students`,
      data,
    })
      .then((res) => {
        props.onSuccess(res.data);
        toast.success("Student Added");
        setData(null);
      })
      .catch((err) => {
        if (Array.isArray(err?.response?.data?.message)) {
          toast.error(err?.response?.data?.message[0]);
        } else {
          toast.error(err?.response?.data?.message);
        }
      });
  };

  const editStudent = () => {
    const { email, ...s } = data;
    axios({
      method: "patch",
      url: `${BACKEND_ENDPOINT}/students/${data.id}`,
      data: { ...s },
    })
      .then((res) => {
        toast.success(res.data.message);
        props.onClose();
        props.success(data);
        setData(null);
      })
      .catch((_) => {
        toast.error("something went wrong. Contact to the maintainer.");
      });
  };
  return (
    <>
      {!isEdit ? (
        <Dialog open={props.isOpen} onClose={props.onClose}>
          <DialogTitle>Add Student</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {/* some hind or title text */}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setData({ ...data, collegeId: e.target.value });
              }}
              value={data?.id}
              label="Student ID"
              required
              type="text"
              variant="filled"
            />
            <TextField
              required
              margin="dense"
              value={data?.name}
              sx={{ marginLeft: 2 }}
              label="Student Name"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <TextField
              required
              margin="dense"
              value={data?.contactNumber}
              sx={{ marginRight: 2 }}
              label="Contact Number"
              onChange={(e) =>
                setData({ ...data, contactNumber: e.target.value })
              }
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            />
          </DialogContent>
          <DialogActions>
            <LoadingButton
              loadingPosition="start"
              startIcon={<SaveIcon />}
              onClick={addStudent}
              disabled={loading}
              variant="contained"
            >
              Add Student
            </LoadingButton>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={props.isOpen} onClose={props.onClose}>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {/* some hind or title text */}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setData({ ...data, collegeId: e.target.value });
              }}
              value={data?.collegeId}
              label="Student ID"
              required
              type="text"
              variant="filled"
            />
            <TextField
              required
              margin="dense"
              value={data?.name}
              sx={{ marginLeft: 2 }}
              label="Student Name"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <TextField
              required
              margin="dense"
              value={data?.contactNumber}
              sx={{ marginRight: 2 }}
              label="Contact Number"
              onChange={(e) =>
                setData({ ...data, contactNumber: e.target.value })
              }
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            />
          </DialogContent>
          <DialogActions>
            <LoadingButton
              loadingPosition="start"
              startIcon={<SaveIcon />}
              onClick={editStudent}
              disabled={loading}
              variant="contained"
            >
              Save Student
            </LoadingButton>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
