import React, { useState } from "react";
import { Paper, TableCell } from "@material-ui/core";
import { Button, TextField } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DataTable from "../../../common/data-table/DataTable";
import FormDialog from "./Dialogue";

import BooksTable from "./BooksTable";

export default function Books() {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

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
        <FormDialog isOpen={showAddModal} onClose={()=>setShowAddModal(false)} />
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
      <BooksTable />
    </Paper>
  );
}
