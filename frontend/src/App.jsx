import "./App.css";
import React from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import PostNumber from "./components/postNumber";
import TaskList from "./components/listOfTask";

function App() {
  const [numberList, setNumberList] = React.useState();
  React.useEffect(() => {
    const config = {
      method: "get",
      url: "http://localhost:5000/numbers",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        "Content-Type": "application/json",
      },
    };
    axios(config).then((result) => setNumberList(result.data));
  });
  return (
    <div className="App" style={{ backgroundColor: "#FFFADE", height: "auto" }}>
      <Typography sx={{ p: "2rem" }} variant="h2" align="center">
        Exercice Technique
      </Typography>
      <PostNumber />
      <TaskList memoList={numberList} />
    </div>
  );
}

export default App;
