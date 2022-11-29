import * as React from "react";
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
import { fetchData } from "../../../../utils/fetch";
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

  const editBook = () => {
    axios({
      method: "patch",
      url: `${BACKEND_ENDPOINT}/books/${data?.isbn}`,
      data,
    })
      .then((res) => {
        toast.success(res.data.message);
        props.onClose();
        props.success(data);
        setData(null);
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong check console")

      });
  };

  const handleOnline = () => {
    setLoading(true);

    fetchData(`books?network=${data.isbn}`)
      .then((data) => {
        if (!data.title) {
          toast.error("ISBN Cannot found Online", { autoClose: 5000 });
          toast.info("Enter Book Data manually", { autoClose: 5000 });
        } else {
          setData(data);
          toast.success("Data fetched from Online");
        }
      })
      .catch((err) => {
        toast.error("ISBN Cannot found Online");
        toast.info("Enter Book Data manually");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addBook = () => {
    axios({
      method: "post",
      url: `${BACKEND_ENDPOINT}/books`,
      data,
    })
      .then((res) => {
        toast.success("Book Added");
        props.onClose();
        props.success(res.data)
        setData(null);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message[0]);
      });
  };
  return (
    <>
      {!isEdit ? (
        <>
          <Dialog
            open={props.isOpen}
            onClose={props.onClose}
          >
            <DialogTitle>Add Book</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You Can Add New Book from this section, Click on Get Online
                button to get the data from online, Else enter all data
                yourself.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setData({ ...data, isbn: e.target.value });
                }}
                value={data?.isbn}
                label="ISBN"
                required
                type="text"
                variant="filled"
              />
              <TextField
                required
                margin="dense"
                id="name"
                placeholder=""
                value={data?.title}
                sx={{ marginLeft: 2 }}
                label="Book Name"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
              <TextField
                required
                margin="dense"
                id="text"
                value={data?.authors}
                sx={{ marginRight: 2 }}
                label="Author Name"
                onChange={(e) => setData({ ...data, authors: e.target.value })}
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
                startIcon={<LanguageIcon />}
                onClick={handleOnline}
                loading={loading}
                variant="contained"
              >
                Search Online
              </LoadingButton>
              <LoadingButton
                loadingPosition="start"
                startIcon={<SaveIcon />}
                onClick={addBook}
                disabled={loading}
                variant="contained"
              >
                Add Book
              </LoadingButton>{" "}
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <>
          <Dialog open={props.isOpen} onClose={props.onClose}>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You Can Edit Book Details from this section.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setData({ ...data, isbn: e.target.value });
                }}
                value={data?.isbn}
                label="ISBN"
                required
                type="text"
                variant="filled"
              />
              <TextField
                required
                margin="dense"
                id="name"
                placeholder=""
                value={data?.title}
                sx={{ marginLeft: 2 }}
                label="Book Name"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                onChange={(e) => {
                  console.log(data);
                  setData({ ...data, title: e.target.value });
                  console.log(data);
                }}
              />
              <TextField
                required
                margin="dense"
                id="text"
                value={data?.authors}
                sx={{ marginRight: 2 }}
                label="Author Name"
                onChange={(e) => setData({ ...data, authors: e.target.value })}
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
                onClick={editBook}
                disabled={loading}
                variant="contained"
              >
                Save Book
              </LoadingButton>{" "}
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}
