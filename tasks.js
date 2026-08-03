
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  // Remove extra spaces and the Enter characters (\r\n)
  text = text.trim();

  // Split the text into separate words using the space character
  // Example: "hello batata" becomes: ["hello", "batata"]
  let words = text.split(" ");

  // Get the first word from the array the first word is always the command
  let command = words[0];

  // Take all words after the command and join them back into one string
  let argument = words.slice(1).join(" ");

  if (command === 'quit' || command === 'exit') {
    quit();
  }
  else if(command === 'hello'){
    hello(argument);
  }
   else if(command === 'help'){
    help();
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @param {string} sentence the text received after hello command
 * @returns {void}
 */
function hello(sentence){
 // Check if the user provided text after hello
 if (sentence) {
  //prints hello followed by the text received after the hello command
  console.log(`hello ${sentence}!`)
  }
  // If the user only typed "hello"
  else {
  console.log('hello!')
  }
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}


/**
 * Lists all the possible commands
 *
 * @returns {void}
 */
function help(){
  console.log("Available commands:");
  console.log("hello");
  console.log("quit");
  console.log("exit");
  console.log("help");
}

// The following line starts the application
startApp("Zaynab Hwayji");
