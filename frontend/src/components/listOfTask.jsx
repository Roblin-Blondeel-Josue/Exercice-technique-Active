import React from "react";
import { PropTypes } from "prop-types";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CreateIcon from "@mui/icons-material/Create";

export default function TaskList({ memoList }) {
  const handleSubmit = (event) => event.preventDefault();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [number, setNumber] = React.useState();
  function handleNumber(event) {
    setNumber(event.target.value);
  }
  const [text, setText] = React.useState();
  function handleText(event) {
    setText(event.target.value);
  }
  function deleteTask(id) {
    const configDelete = {
      method: "delete",
      url: `http://localhost:5000/numbers/${id}`,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/",
      },
    };
    axios(configDelete).then((response) => {
      // eslint-disable-next-line no-restricted-syntax
      console.log(JSON.stringify(response.data));
    });
  }
  function upDate(id, numberUp, textUp) {
    const configupDate = {
      method: "put",
      url: `http://localhost:5000/numbers/${id}`,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        number: numberUp,
        text: `${textUp}`,
      }),
    };
    axios(configupDate)
      .then((response) => {
        // eslint-disable-next-line no-restricted-syntax
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        // eslint-disable-next-line no-restricted-syntax
        console.log(error);
      });
    setOpen(!open);
  }
  return (
    <Card style={{ width: "90vw", margin: "5vh 5vw" }}>
      <CardHeader
        sx={{ bgcolor: "#81B2C9" }}
        title={
          <Typography align="center" variant="h4">
            Votre Mémo
          </Typography>
        }
      />
      <CardContent>
        {memoList ? (
          <List sx={{ overflowY: "scroll" }}>
            {memoList.map((item) => {
              return (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={`Priorité ${item.number}`}
                    secondary={item.text}
                  />
                  <Button onClick={() => deleteTask(item.id)}>
                    <CancelIcon />
                  </Button>
                  <Button onClick={handleClickOpen}>
                    <CreateIcon />
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <form onSubmit={handleSubmit}>
                          <TextField
                            required
                            helperText="Please enter the new priority of the task"
                            id="number"
                            label="Priority :"
                            sx={{ m: "1rem" }}
                            onChange={(e) => handleNumber(e)}
                          />
                          <TextField
                            required
                            helperText="Please enter your new memo"
                            id="memo"
                            label="Memo :"
                            sx={{ m: "1rem" }}
                            onChange={(e) => handleText(e)}
                          />
                        </form>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => upDate(item.id, number, text)}
                        autoFocus
                      >
                        Envoyez
                      </Button>
                    </DialogActions>
                  </Dialog>
                </ListItem>
              );
            })}
          </List>
        ) : (
          ""
        )}
      </CardContent>
    </Card>
  );
}
TaskList.propTypes = {
  memoList: PropTypes.isRequired,
};
