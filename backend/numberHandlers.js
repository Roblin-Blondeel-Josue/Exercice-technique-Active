const database = require("./database");

const getNumbers = (req, res) => {
  const initialSql = "select id, number, text from numbers order by number asc";
  const where = [];

  database
    .query(
      where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
        initialSql
      ),
      where.map(({ value }) => value)
    )
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getNumberById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  database
    .query("select id, number, text from numbers where id = ?", [id])
    .then(([numbers]) => {
      if (numbers[0] != null) {
        res.json(numbers[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postNumber = (req, res) => {
  const { number, text } = req.body;

  database
    .query("INSERT INTO numbers(number, text) VALUES (?, ?)", [number, text])
    .then(([result]) => {
      res.location(`/numbers/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the number");
    });
};

const updateNumber = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { number, text } = req.body;

  database
    .query("update numbers set number = ?, text = ? where id = ?", [
      number,
      text,
      id,
    ])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the number");
    });
};

const deleteNumber = (req, res) => {
  const id = parseInt(req.params.id, 10);

  database
    .query("delete from numbers where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the number");
    });
};

module.exports = {
  getNumbers,
  getNumberById,
  postNumber,
  updateNumber,
  deleteNumber,
};
