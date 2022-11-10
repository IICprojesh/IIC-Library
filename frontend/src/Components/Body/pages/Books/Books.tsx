import * as React from 'react';
import styles from "./Books.module.css"
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@material-ui/core'
import TablePagination from '@mui/material/TablePagination';
import { Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import FormDialog from './Dialogue';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxHeight: 900

  },

  tableHeaderCells: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark)
  }, avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  name: {
    fontWeight: 'bold',
    color: theme.palette.secondary.dark
  },
  status: {
  },
  button: {
    fontWeight: 'bold',
    fontSize: '0.75rem',
    color: 'white',
    backgroundColor: theme.palette.primary.dark,
    padding: '3px 15px',
    display: 'inline-block'
  },
  tableCell: {
    width: 450,
  }
}));

function paginate(rows: any[], start: number, limit: number) {
  const data = rows.slice(start, limit);
  console.log(data)
  return data;

}

export default function Books() {
  const [rows, setRows] = React.useState<any[]>([])
  React.useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3500/books',
    }).then((res) => {
      console.log(res);
      setRows(res.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(newPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
  };
  const [dialog, setDialog] = React.useState(false)


  return (

    <Paper style={{ width: '100%', maxHeight: 700, marginTop: 20 }}>
      <FormDialog isOpen={dialog} onClose={() => setDialog(false)} onSuccess={(data: any) => {
        setRows([...rows, data])
        setDialog(false);

      }} />
      <div style={{ display: 'flex', marginBottom: 15, justifyContent: 'space-between' }} >
        <Button onClick={() => {
          setDialog(true)
        }} variant="outlined" className={classes.button} startIcon={<AddCircleOutlineOutlinedIcon />} > ADD Book</Button>
        <div >
          <TextField spellCheck id="outlined-basic" sx={{ width: 500, marginRight: 2 }} label="Search Book By ISBN Or Name" variant="outlined" />
          <Button variant="contained" sx={{ padding: 2 }} className={classes.button} startIcon={<SearchOutlinedIcon />} >Search Book</Button>

        </div>


      </div>
      <TableContainer component={Paper} className={classes.tableContainer} >
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCells} style={{ width: '60px' }}> Image</TableCell>
              <TableCell align='center' className={classes.tableHeaderCells}>ISBN Number</TableCell>
              <TableCell align='center' className={classes.tableHeaderCells}>Book Name</TableCell>
              <TableCell align='center' className={classes.tableHeaderCells}>Author Name</TableCell>
              <TableCell align='center' className={classes.tableHeaderCells}>Action</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {paginate(rows, page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.name}
                >

                  <TableCell className={classes.tableCell} style={{ width: '60px' }}>
                    <img src={row.image} alt={row.author} style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                      borderRadius: 5
                    }} /></TableCell>
                  <TableCell align='center' className={classes.tableCell}>{row.isbn}</TableCell>
                  <TableCell align='center' className={classes.tableCell}>{row.title}</TableCell>
                  <TableCell align='center' className={classes.tableCell}>{row.authors}</TableCell>
                  <TableCell style={{ paddingBottom: 40, display: 'flex', justifyContent: 'center' }} className={classes.tableCell}  >
                    <Button variant="contained" sx={{ marginRight: 3 }} startIcon={<CreateIcon />} className={classes.status} style={{ backgroundColor: '#adc7fb', color: '#083fad' }}>Edit</Button>
                    <Button variant="contained" startIcon={<DeleteIcon />} className={classes.status} style={{ backgroundColor: '#fcb4b9', color: '#e60818', }}>Delete</Button>
                  </TableCell>


                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer >
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
