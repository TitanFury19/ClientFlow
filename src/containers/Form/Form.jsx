import { useState} from "react";
import { Box, Button, TextField } from "@mui/material";
import Header from "../../components/Header";

function Form() {
  const [formData, setFormData] = useState({
    id: 1,
    name: "",
    age: "",
    phone: "",
    email: "",
    address: [{ id: 1, value: "" }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedData = localStorage.getItem("myData");
    const parsedData = storedData ? JSON.parse(storedData) : [];
    const userData = { ...formData, id: parsedData.length + 1 };
    const newData = [...parsedData, userData];
    localStorage.setItem("myData", JSON.stringify(newData));
    setFormData({
      id: 1,
      name: "",
      age: "",
      phone: "",
      email: "",
      address: [{ id: 1, value: "" }],
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddAddress = () => {
    const newId = formData.address[formData.address.length - 1].id + 1;
    const updatedFormData = {
      ...formData,
      address: [...formData.address, { id: newId, value: "" }],
    };
    if (newId <= 3) {
      setFormData(updatedFormData);
    }
  };

  const handleAddressChange = (event, addressId) => {
    const newAddresses = formData.address.map((address) =>
      address.id === addressId
        ? { ...address, value: event.target.value || "" }
        : address
    );
    const updatedFormData = { ...formData, address: newAddresses };
    setFormData(updatedFormData);
  };

  return (
    <Box m="20px">
      <Header title="Nuevo Cliente" subtitle="Gestor de nuevos Usuarios" />

      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: "span 4" },
          }}
        >
          <TextField
            fullWidth
            type="text"
            label="Nombre"
            onChange={handleInputChange}
            value={formData.name}
            name="name"
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            type="number"
            label="Edad"
            onChange={handleInputChange}
            value={formData.age}
            name="age"
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            type="text"
            label="Telefono"
            onChange={handleInputChange}
            value={formData.phone}
            name="phone"
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            type="email"
            label="Email"
            onChange={handleInputChange}
            value={formData.email}
            name="email"
            sx={{ gridColumn: "span 2" }}
          />
          {formData.address &&
            formData.address.map((a) => (
              <TextField
                fullWidth
                type="text"
                label={`Dirección ` + a.id}
                onChange={(event) => handleAddressChange(event, a.id)}
                value={a.value}
                name="address"
                sx={{ gridColumn: "span 4" }}
              />
            ))}
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="button" onClick={handleAddAddress}>
            Agregar nueva dirección
          </Button>
          <Button type="submit" color="secondary" variant="contained">Enviar</Button>
        </Box>
      </form>
    </Box>
  );
}

export default Form;
