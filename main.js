#!/usr/bin/env node
var readlineSync = require('readline-sync'),
        chalk = require('chalk'),
        Table = require('cli-table');
console.log(chalk.black.bold.bgRed("Welcome to Silanis lottery"));
var lottery = {
    pot: 200,
    people: [],
    result: [],
    purchase: function () {
        if (this.people.length >= 50) {
            console.log(chalk.bold.red("The pot is full, you can not purchase new ticket"));
            this.getCommand("input command:");
        } else {
            var userName = readlineSync.question("what's your name? ").toLowerCase();
            if (userName == "") {
                console.log(chalk.bold.red("Please insert a valid name "));
                this.purchase();
            }
            else if (this.checkUser(userName)) {
                this.people.push(userName);
                this.pot += 10;
                console.log(chalk.green("Ball number of " + userName + " is " + this.people.length));
                this.getCommand("input command:");
            } else {
                console.log(chalk.bold.red("User already exists "));
                this.getCommand("input command:");
            }
        }
    },
    draw: function () {
        if (this.people.length < 4) {
            console.log(chalk.bold.red("Drawing is not possible because you didn't sell enough tickets "));
            this.getCommand("input command:");
        } else {
            console.log(chalk.green("you sold " + this.people.length + " tickets"));
            console.log(chalk.green("you have " + this.pot + "$ in the pot"));
            var answer = readlineSync.question("Are you sure to draw? Y/N ").toLowerCase();
            if (answer == "y") {
                totalPrize = this.pot / 2;
                firstPrize = Math.round((totalPrize * 75) / 100);
                secondPrize = Math.round((totalPrize * 15) / 100);
                thirddPrize = Math.round((totalPrize * 10) / 100);
                ranks = this.rand();
                this.result[0] = this.people[ranks[0]] + ": " + firstPrize + "$";
                this.result[1] = this.people[ranks[1]] + ": " + secondPrize + "$";
                this.result[2] = this.people[ranks[2]] + ": " + thirddPrize + "$";
                this.pot = this.pot - (firstPrize + secondPrize + thirddPrize);
                this.people = [];
                //this.spinner();
                //this.getCommand("input command:");
                this.winners();
            } else
            if (answer == "n") {
                this.getCommand("input command:");
            } else {
                console.log(chalk.bold.red("Your answer is not correct, please use 'Y' or 'N' "));
                this.draw();
            }
        }
    },
    winners: function () {
        if (this.result.length == 0) {
            console.log(chalk.bold.red("winners list is empty "));
            this.getCommand("input command:");
        } else {
            var table = new Table({
                head: ['1st ball', '2nd ball', '3rd ball']
            });
            table.push(this.result);
            console.log(table.toString());
            this.getCommand("input command:");
        }
    },
    getCommand: function (c) {
        var userCommand = readlineSync.question(c).toLowerCase();
        switch (userCommand) {
            case "purchase":
                this.purchase();
                break;
            case "draw":
                this.draw();
                break;
            case "winners":
                this.winners();
                break;
            case "exit":
                console.log(chalk.green("bye..."));
                process.exit(0);
                break;
            default:
                console.log(chalk.bold.red("Command not found, try again"));
                this.getCommand("input command:");
        }

    },
    checkUser: function (userName) {

        for (var i = 0; i < this.people.length; i++) {
            if (this.people[i] == userName) {
                return false;
            }
        }
        return true;
    },
    rand: function () {
        rands = [];
        while (rands.length < 3) {
            var x = Math.floor((Math.random() * this.people.length) + 0);
            token = true;
            for (var i = 0; i < rands.length; i++) {
                if (rands[i] == x) {
                    token = false;
                }
            }
            if (token) {
                rands.push(x);
            }
        }
        return rands;
    }
};
lottery.getCommand("input command:");





