const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

module.exports.logo = () => {
  clear();
  console.log(
    chalk.green(figlet.textSync("Extendo", { horizontalLayout: "full" }))
  );
};
