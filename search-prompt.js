const inquirer = require("inquirer");

module.exports.search = () => {
    const questions = [
        {
            name: "searchTerm",
            type: "input",
            message: "What would you like to search for?",
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return "Please enter a search term";
                }
            }
        }
    ];
    return inquirer.prompt(questions);
};
