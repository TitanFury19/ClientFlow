import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../Themes";
import Header from "../../components/Header";
import {
  useTheme,
  Button,
  Box,
} from "@mui/material";
import { RemoveRedEye, Clear } from "@mui/icons-material";
import DialogMessage from "../../components/Dialog";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [state, setstate] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState([]);

  const getData = () => {
    const storedData = localStorage.getItem("myData");
    setstate(JSON.parse(storedData));
  };

  const eraseData = (id) => {
    const newData = state.filter((datum) => datum.id !== id);
    setstate(newData);
    localStorage.setItem("myData", JSON.stringify(newData));
  };

  useEffect(() => {
    getData();
  }, []);


  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },

    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Edad",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Número de Telefono",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "address",
      headerName: "Dirección",
      width: 120,
      renderCell: (params) => (
        <Button
          onClick={() => {
            setSelectedAddress(params.value);
            setOpenModal(true);
          }}
        >
          <RemoveRedEye />
        </Button>
      ),
    },
    {
      field: "erase",
      headerName: "Borrar",
      width: 120,
      renderCell: (params) => (
        <Button onClick={() => eraseData(params.row.id)}>
          <Clear />
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box m="20px">
        <Header title="CLIENTES" subtitle="Lista de clientes" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          {state && state.length > 0 ? (
            <DataGrid
              rows={state}
              columns={columns}
              // getRowId={(row) => row.id}
              components={{ Toolbar: GridToolbar }}
            />
          ) : (
            <div>No existen clientes en este apartado</div>
          )}
        </Box>
      </Box>

      <DialogMessage
        title={'Direcciones de clientes'}
        textContent={selectedAddress}
        openModal={openModal}
        onclose={() => setOpenModal(false)}
        cancel={() => setOpenModal(false)}
        onClick={() => setOpenModal(false)}
      />

      {/* <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Direcciones de clientes</DialogTitle>
        {selectedAddress &&
          selectedAddress.length > 0 &&
          selectedAddress.map((a, index) => (
            <DialogContent>
              <DialogContentText>{a.value ? a.value : ""}</DialogContentText>
            </DialogContent>
          ))}
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={() => setOpenModal(false)}>Ok</Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export default Dashboard;
