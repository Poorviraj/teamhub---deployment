require("dotenv").config();

require("./config/env");

const app = require("./app");

const { PORT } = require("./config/env");

app.listen(PORT, () => {
    console.log(`Backend restarted on port ${PORT}`);
});