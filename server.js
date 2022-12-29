const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/feedback", (request, response) => {
  let db = new sqlite3.Database("db/feedbacknew.db");

  // Select query
  const selectQuery =
    "SELECT id, name, mobile, rating, recommendation, comments, status FROM feedback";

  db.all(selectQuery, [], (err, rows) => {
    if (err) {
      response.json({
        message: err.message,
      });
    } else {
      const feedbacks = rows.map((singleRow) => {
        return {
          id: singleRow.id,
          name: singleRow.name,
          mobile: singleRow.mobile,
          rating: singleRow.rating,
          recommendation: singleRow.recommendation,
          comments: singleRow.comments,
          status: singleRow.status,
        };
      });

      response.json(feedbacks);
    }
  });

  db.close();
});

app.post("/feedback", (request, response) => {
  const newFeedback = request.body;

  console.log(newFeedback);

  // insert query

  // db connection open
  let db = new sqlite3.Database("db/feedbacknew.db");

  const insertQuery =
    "INSERT INTO feedback(name, mobile, rating, recommendation, comments, status) VALUES (?, ?, ?, ?, ?, '')";

  const values = [
    newFeedback.name,
    newFeedback.mobile,
    newFeedback.rating,
    newFeedback.recommendation,
    newFeedback.comments,
  ];
  // execute queries
  db.run(insertQuery, values, (err) => {
    if (err) {
      response.json({
        message: err.message,
      });
    } else {
      response.json({
        message: "Successfully inserted data ",
      });
    }
  });
  // db connection close
  db.close();
});

app.put("/feedback", (request, response) => {
  const updatedFeedback = request.body;

  let db = new sqlite3.Database("db/feedbacknew.db");

  const updatedStatus = updatedFeedback.status;
  const id = updatedFeedback.id;

  const updateQuery = "UPDATE feedback SET status = ? WHERE id = ?";

  const values = [updatedStatus, id];

  db.run(updateQuery, values, (err) => {
    if (err) {
      response.json({
        message: err.message,
      });
    } else {
      response.json({
        message: "Successfully updated data ",
      });
    }
  });

  db.close();
});

app.delete("/feedback", (request, response) => {
  response.json({
    message: "delete Stella voda endpoint",
  });
});

//PORT number - 5001
app.listen(5001, () => {
  console.log("Listen panna start pannittaen, use 5001..");
});
