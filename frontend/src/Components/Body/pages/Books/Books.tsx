import React, { useEffect, useState } from "react";
import { Paper, TableCell } from "@material-ui/core";
import { Button, TextField } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import FormDialog from "./Dialogue";

import BooksTable from "./BooksTable";
import { motion } from "framer-motion";
import { useDebounce } from "usehooks-ts";
import { fetchData } from "../../../../utils/fetch";
import { BookType } from "./book.type";

export default function Books() {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce<string>(search, 500);
  const [dailogdata, setDilogdata] = useState(null);

  useEffect(() => {
    setDilogdata(null);
  },[]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0 }}
    >
      <Paper
        style={{
          width: "100%",
          boxShadow: "none",
          maxHeight: 700,
          marginTop: 20,
        }}
      >
        {showAddModal && (
          <FormDialog
            success={(data: any) => {
              setDilogdata(data);
            }}
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
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
        <BooksTable datas={dailogdata} searchKey={debouncedSearch} />
      </Paper>
    </motion.div>
  );
}
