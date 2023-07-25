#!/usr/bin/env node

const prompt = require('prompt-sync')();
const chalk = require("chalk");
const ezrandom = require("@qwertyr0/ezrandom");
const phrases = require("./data.json");
// const args = process.argv.slice(1)[1];
const stupidArray = ["A", "B", "C"];

const PleaseChose = () => {
    console.log(chalk.blue("Please Select one: ") + chalk.magenta("Guess(g)") + "," + chalk.magenta(" Fill(f)\n"));
    let choice = prompt(chalk.green("> ")).toLowerCase();

    if(choice === "guess" || choice === "g"){
        return "guess";
    } else if(choice === "fill" || choice === "f"){
        return "fill";
    } else {
        console.log(chalk.red("That's not a correct choice."));
        return PleaseChose();
    }
}

main();

function main(){
    console.log(chalk.red("WELCOME TO SPANISH QUIZ APP"));
    console.log(chalk.cyan("     Made by QwertyR0" + "\n"));
    let mode = PleaseChose();

    if(mode === "guess"){
        guessing();
    } else if(mode === "fill"){
        console.log("Coming Soon!");
        console.log("(I wasn't fast enough)\n");
        main();
    }
}

function guessing(){

    console.log(chalk.blue("\nHow many questions do you want(Max 30)?"));
    let choice = prompt("> ")

    if(isNaN(parseInt(choice))){
        console.log(chalk.red("\nyour choice has to be a number"));
        return guessing();
    }
    
    let chosen = ezrandom.selection(phrases.translation, parseInt(choice));
    let sum = 0;
    
    // sorry for trash code
    if(parseInt(choice) > 30){
        choice = "30";
    }

    for(var i = 1; i <= parseInt(choice); i++){
        let muchChosen = chosen[i - 1];
        let scrambled = shuffle([muchChosen.english, muchChosen.fool_1, muchChosen.fool_2]);
        let answerLetter = "";

        console.log("\n\n" + `${i}. "${chalk.blue(muchChosen.question)}"\n`);
        scrambled.forEach((item, index) => {
            let letter = stupidArray[index]
            console.log(`${chalk.bgYellow(letter + ":")} ${item}`);
            if(item === muchChosen.english){
                answerLetter = letter;
            }
        });

        let anserAlready = letChoice(answerLetter);
        if(anserAlready){
            sum++;
        }
    }

    console.log(`\n\n${chalk.magenta("You scored:")} ${chalk.green(sum)}${chalk.yellow("/")}${chalk.green(choice)}`);
    console.log(chalk.red("Press \"Enter\" to go to the main menu."));
    prompt("");
    main();
}

function letChoice(real){
    let yetAnotherChoice = prompt("> ");
    if (yetAnotherChoice.toLowerCase() === "a" || yetAnotherChoice.toLowerCase() === "b" || yetAnotherChoice.toLowerCase() === "c"){
        if(yetAnotherChoice.toLowerCase() === real.toLowerCase()){
            return true;
        } else {
            return false;
        }
    } else {
        console.log(chalk.red("\nPlease make a valid choice."));
        return letChoice(real);
    }
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}