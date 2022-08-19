require("dotenv").config()
console.log(process.env.TWILIO_ACCOUNT_SID)

const app = require("./app");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
