import { Box, Typography, Alert } from "@mui/material";
import axios from "axios";
import { AlertTitle } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlCreateGender } from "../../Config/endpoinst";
import { sizeCreationDTO } from "./size.model";
import SizeForm from "./SizeForm";

export default function CreateSize() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  async function create(size: sizeCreationDTO) {
    try {
      var result = await axios.post(urlCreateGender, size);
      if (result.data && result.data.Message) {
        // Set the success message from the response
        setSuccessMessage(result.data.Message);
      } else {
        // Set a default success message if the response doesn't contain one
        setSuccessMessage("Size created successfully!");
      }
      console.log(result);
      setError(null);
      navigate("./sizes", { state: { successMessage } });
    } catch (error: any) {
      if (error.response) {
        const errorResponse = error.response.data;
        const errorMessage = `${errorResponse.detail}`;
        setError(errorMessage);
      }
    }
  }

  return (
    <div>
      {error && ( // Conditional rendering of error message
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <Box mt={3} textAlign="center">
        <Typography variant="h6" align="center">
          Create Gender
        </Typography>
      </Box>
      <SizeForm
        model={{ name: "" }}
        onSubmit={async (value) => {
          await create(value);
        }}
      ></SizeForm>
    </div>
  );
}
