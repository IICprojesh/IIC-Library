import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import LanguageIcon from '@mui/icons-material/Language';
import axios from 'axios';

const handleOnline = () => {

}
export default function FormDialog(props: any) {
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState<any>(null);

  const handleOnline = () => {
    setLoading(true);
    axios({
      method: "get",
      url: `http://localhost:3500/books?network=${data.isbn}`
    }).then((res) => {
      setData(res.data)
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setLoading(false)
    })
  }

  const addBook = () => {
    axios({
      method: 'post',
      url: "http://localhost:3500/books",
      data,
    }).then((res) => {
      props.onSuccess(res.data)
      setData(null)
      console.log(res.data)
    })
  }
  return (
    <>
      <Dialog open={props.isOpen} onClose={props.onClose}>
        <DialogTitle>Add Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You Can Add New Book from this section, Click on Get Online button to get the data from online, Else enter all data yourself.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            InputLabelProps={{
              shrink: true
            }}
            onChange={(e) => {
              setData({ ...data, isbn: e.target.value })
            }}
            value={data?.isbn}
            label="ISBN"
            required

            type="text"
            variant="filled"
          />
          <TextField
            required
            margin='dense'
            id="name"
            placeholder=''
            value={data?.title}
            sx={{ marginLeft: 2 }}
            label="Book Name"
            type="text"
            InputLabelProps={{
              shrink: true
            }}
            variant="filled"
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <TextField
            required

            margin='dense'
            id="text"
            value={data?.authors}
            sx={{ marginRight: 2 }}
            label="Author Name"
            type="text"
            InputLabelProps={{
              shrink: true
            }}
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton loadingPosition="start"
            startIcon={<LanguageIcon />}
            onClick={handleOnline}
            loading={loading}
            variant="contained">
            Search Online
          </LoadingButton>
          <LoadingButton loadingPosition="start"
            startIcon={<SaveIcon />}
            onClick={addBook}
            disabled={loading}
            variant="contained">
            Add Book
          </LoadingButton>        </DialogActions>
      </Dialog>
    </>
  );
}
