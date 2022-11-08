import * as React from 'react';
import styles from "./Books.module.css"
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@material-ui/core'
import TablePagination from '@mui/material/TablePagination';
import { Button } from '@mui/material';

function createData(
  image: string,
  isbn: string,
  name: string,
  author: string,
) {
  return { image, isbn, name, author };
}

const rows = [
  createData("", '978-1612680194', "a", "Robert T. Kiyosaki"),
  createData("", '978-1612680194', "b", "Robert T. Kiyosaki"),
  createData("", '978-1612680194', "c", "Robert T. Kiyosaki"),
  createData("", '978-1612680194', "d", "Robert T. Kiyosaki"),
  createData("", '978-1612680194', "e", "Robert T. Kiyosaki"),
  createData("", '978-1612680194', "f", "Robert T. Kiyosaki"),
  createData("", '978-1612680194', "g", "Robert T. Kiyosaki"),
  createData("", '978-1612680194', "h", "Robert T. Kiyosaki"),
  createData("", '978-1612680194', "i", "Robert T. Kiyosaki"),
  createData("", '978-1612680194', "j", "Robert T. Kiyosaki"),
  createData("", '978-1612680194', "k", "Robert T. Kiyosaki"),
  createData("", '978-1612680194', "l", "Robert T. Kiyosaki"),
  createData("", '978-1612680194', "m", "Robert T. Kiyosaki"),
];

const useStyles = makeStyles((theme) => ({
  table: {

  },
  tableContainer: {
    borderRadius: 15,
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
    fontWeight: 'bold',
    fontSize: '0.75rem',
    color: 'white',
    backgroundColor: 'grey',
    borderRadius: 8,
    padding: '3px 10px',
    display: 'inline-block'
  }
}));


function paginate(rows: any[], start: number, limit: number) {
  const data = rows.slice(start, limit);
  console.log(data)
  return data;

}



export default function Books() {
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

  return (
    <Paper style={{ width: '100%', maxHeight: 700 }}>
      <TableContainer component={Paper} className={classes.tableContainer} >
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCells} > Image</TableCell>
              <TableCell className={classes.tableHeaderCells}>ISBN Number</TableCell>
              <TableCell className={classes.tableHeaderCells}>Book Name</TableCell>
              <TableCell className={classes.tableHeaderCells}>Author Name</TableCell>          
              <TableCell className={classes.tableHeaderCells}>Action</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {paginate(rows, page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.name}
                >
                  <TableCell >
                    <Avatar alt={row.name} className={classes.avatar} src='.' /></TableCell>
                  <TableCell >{row.isbn}</TableCell>
                  <TableCell >{row.name}</TableCell>
                  <TableCell >{row.author}</TableCell>
                  <TableRow>
                    <TableCell ><Button className={classes.status} style={{ backgroundColor: 'blue', color: 'white' }}>Edit</Button></TableCell>
                    <TableCell ><Button className={classes.status} style={{ backgroundColor: 'red', color: 'white', }}>Delete</Button></TableCell>
                  </TableRow>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer >
      <TablePagination
        rowsPerPageOptions={[5,10]}
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
