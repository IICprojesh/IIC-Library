import React, { useState } from "react";
import { Paper, TableCell } from "@material-ui/core";
import { Button, TextField } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DataTable from "../../../common/data-table/DataTable";
import FormDialog from "./Dialogue";

export default function Books() {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [newBook, setNewBook] = useState<any>(null);

  React.useEffect(() => {
    setNewBook(null);
  }, []);

  return (
    <Paper
      style={{
        width: "100%",
        overflow: "hidden",
        boxShadow: "none",
        maxHeight: 700,
        marginTop: 20,
      }}
    >
      {showAddModal && (
        <FormDialog
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={(data: any) => {
            setNewBook({ ...data });
            setShowAddModal(false);
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          marginBottom: 15,
          marginTop: 5,
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => {
            setShowAddModal(true);
          }}
          variant="outlined"
          startIcon={<AddCircleOutlineOutlinedIcon />}
        >
          {" "}
          ADD Book
        </Button>
        <div>
          <TextField
            spellCheck
            id="outlined-basic"
            sx={{ width: 500 }}
            label="Search Book By ISBN Or Name"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value.trimStart())}
          />
        </div>
      </div>
      <DataTable
        searchText={search}
        resource="books"
        headers={["image", "isbn number", "book name", "Authors"]}
        actionId="isbn"
        onAdd={{ ...newBook }}
      >
        {(row: any) => {
          return (
            <>
              <TableCell>
                <img
                  src={row.image}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  alt={row.title}
                />
              </TableCell>
              <TableCell>{row.isbn}</TableCell>
              <TableCell>{row.title.substr(0, 100) + "..."}</TableCell>
              <TableCell>{row.authors}</TableCell>
            </>
          );
        }}
      </DataTable>
    </Paper>
  );
}
