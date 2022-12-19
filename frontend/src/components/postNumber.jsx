import React from "react";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function PostNumber() {
  const handleSubmit = (event) => event.preventDefault();
  const [number, setNumber] = React.useState();
  function handleNumber(event) {
    setNumber(event.target.value);
  }
  const [text, setText] = React.useState();
  function handleText(event) {
    setText(event.target.value);
  }
  const post = [number, text];
  const [work, setWork] = React.useState("");
  function sendNumber(value) {
    const config = {
      method: "post",
      url: "http://localhost:5000/numbers",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        number: value[0],
        text: `${value[1]}`,
      }),
    };
    axios(config).then((result) => setWork(result.data));
  }
  return (
    <Card style={{ width: "90vw", margin: "5vh 5vw" }}>
      <CardHeader
        sx={{ bgcolor: "#81B2C9" }}
        title={
          <Typography align="center" variant="h4">
            Memo
          </Typography>
        }
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            helperText="Please enter the priority of the task"
            id="number"
            label="Priority :"
            sx={{ m: "1rem" }}
            onChange={(e) => handleNumber(e)}
          />
          <TextField
            required
            helperText="Please enter your memo"
            id="memo"
            label="Memo :"
            sx={{ m: "1rem" }}
            onChange={(e) => handleText(e)}
          />
        </form>
        <Button
          style={{ padding: "1rem" }}
          variant="text"
          onClick={() => sendNumber(post)}
        >
          Envoyez <SendIcon style={{ marginLeft: "1rem" }} />
        </Button>
        {work ? <Typography variant="body1">{work}</Typography> : ""}
      </CardContent>
    </Card>
  );
}
