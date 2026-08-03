// List of tasks
let tasks = [
  {
    text: "Buy bread",
    done: false
  },
  {
    text: "Do the exercise",
    done: true
  },
  {
    text: "Study Node.js",
    done: true
  }
];

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
function startApp(name) {
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
  else if (command === 'hello') {
    hello(argument);
  }
  else if (command === 'help') {
    help();
  }
  else if (command === "list") {
    list();
  }
  else if (command === "add") {
    add(argument);
  }
  else if (command === "remove") {
    remove(argument);
  }
  else if (command === "edit") {
    edit(words.slice(1));
  }
  else {
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
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"')
}


/**
 * Says hello
 *
 * @param {string} sentence the text received after hello command
 * @returns {void}
 */
function hello(sentence) {
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
function quit() {
  console.log('Quitting now, goodbye!')
  process.exit();
}


/**
 * Lists all the possible commands
 *
 * @returns {void}
 */
function help() {
  console.log("Available commands:");
  console.log("hello [text] - Greets the user with the provided text or just says hello if no text is provided.");
  console.log("quit - Exits the application.");
  console.log("exit - Exits the application.");
  console.log("help - Displays this help message.");
  console.log("list - Displays the list of tasks.");
  console.log("add [task] - Adds a new task to the list.");
  console.log("remove [task number] - Removes the task with the specified number from the list. If no number is provided, removes the last task.");
  console.log("edit [task number] [new text] - Edits the task with the specified number and replaces it with the new text. If no number is provided, edits the last task.");
}

/**
 * Prints all tasks with their numbers status.
 *
 * @returns {void}
 */
function list() {

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
     if (task.done) {
      console.log(`${i + 1} - [✓] ${task.text}`);
    } 
    else {
      console.log(`${i + 1} - [ ] ${task.text}`);
    }

  }

}

/**
 * Adds a new task to the task list.
 *
 * @param {string} task the task to add
 * @returns {void}
 */
function add(task) {

  // Check if the user entered a task
  if (!task) {
    console.log("Error: Please enter a task.");
    return;
  }

  // Add the task to the array
  tasks.push({ text: task, done: false });

  console.log(`Task "${task}" added.`);
}

/**
 * Removes a task from the task list.
 *
 * @param {string} taskNumber the task number to remove
 * @returns {void}
 */
function remove(taskNumber) {
  if (!taskNumber) {

    let removedTask = tasks.pop();
    console.log(`Task "${removedTask.text}" removed.`);
    return;
  }

  // Convert the task number from string to number
  let index = Number(taskNumber);

  if (isNaN(index) || index < 1 || index > tasks.length) {
    console.log("Error: Invalid task number.");
    return;
  }
  // Remove one task from the array
  tasks.splice(index - 1, 1);

  console.log(`Task ${taskNumber} removed.`);
}

/**
 * Edits an existing task in the task list.
 *
 * @param {array} arguments the arguments after edit command
 * @returns {void}
 */
function edit(arguments) {

  if (arguments.length === 0) {
    console.log("Error: Please enter new text.");
    return;
  }

  let taskNumber = Number(arguments[0]);

  // User provided a task number
  if (!isNaN(taskNumber)) {

    if (taskNumber < 1 || taskNumber > tasks.length) {
      console.log("Error: Invalid task number.");
      return;
    }

    let newText = arguments.slice(1).join(" ");

    if (!newText) {
      console.log("Error: Please enter new text.");
      return;
    }

    tasks[taskNumber - 1].text = newText;

    console.log(`Task ${taskNumber} changed to "${newText}"`);

  }

  // User did not provide a number,
  // edit the last task
  else {

    let newText = arguments.join(" ");

    tasks[tasks.length - 1].text = newText;

    console.log(`Last task changed to "${newText}"`);

  }

}
// The following line starts the application
startApp("Zaynab Hwayji");
