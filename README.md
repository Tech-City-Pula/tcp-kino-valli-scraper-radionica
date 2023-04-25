# tcp kino valli scraper

## pre-requisites

### [Github account](https://github.com/)

A online platform where users upload code. 

### [Github CLI](https://cli.github.com/)

Makes working with Github through the command line easy.

### [Node.js](https://nodejs.org/en)

Javascript runtime. Necessary for running Javascript on your computer (not in the browser).

### [VS Code](https://code.visualstudio.com/)

Code editor. You need one to write programs and not hate yourself at the same time.

### [Live share plugin for VS Code](https://visualstudio.microsoft.com/services/live-share/)

A live collaboration plugin. Allows people to join you to code together!

#### **BONUS** 
[😎 ChatGPT](https://chat.openai.com/)

## checkpoints

### **🏗️ project setup**
first we pull the repo. we can do this using Github CLI run `gh clone <repo name>`. 

next up we install dependencies. run the command `npm install` at the root of the project (folder with this README.md file). 

take a quick look at the cheatsheet. open `cheatsheet.excalidraw`. 

lastly, run smoke test to see that everything is set up correctly. run the command `npm run smoke-test`.

you should see "it works!" in the terminal if everything is fine 🥳 👯

### **💻 writing some code**

1. add a main function to have a clear entry point to the program
2. get the html from Kino Valli's page - https://www.kinovalli.net/svi-programi
3. parse the received html to get the movie data
4. display the parsed data in the terminal

### **⏭️ further steps**

- add prompts to the CLI
- save the results
- display only the results that are still available
- add cinestar movies and color code movies based on cinema
- try writing this in another language of your choosing

remember to share your results with us on our Discord server! we're here to help you if you're feeling stuck at any point