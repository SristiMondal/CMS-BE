const app = require("./app");
const { connectDB } = require("./config/dbConfig");

PORT = process.env.PORT || 8080;

// connectDB().then(() => {
// Start the server after successful database connection
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
// })
// .catch((error) => {
//   console.error("Unable to connect to the database:", error);
// });
