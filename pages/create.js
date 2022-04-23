import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";

export default function Create() {
  const [nameValue, setNameValue] = useState("");
  const [contentValue, setContentValue] = useState("");

  const router = useRouter();

  async function onFormSubmit(event) {
    event.preventDefault();

    const response = await fetch("/api/card/create", {
      method: "POST",
      body: JSON.stringify({
        name: nameValue,
        content: contentValue,
      }),
    });
    console.log(await response.json());

    router.push("/cards");
  }

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h1">Add a new card</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="content"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={contentValue}
            onChange={(event) => {
              setContentValue(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={nameValue}
            onChange={(event) => {
              setNameValue(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
