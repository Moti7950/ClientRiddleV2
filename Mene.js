import readline from 'readline-sync';
import 'dotenv/config'
import { newUser } from './utils/utilityFunction.js';

let running = true;

async function startMene() {
    while (running) {
        const menu = `
╔══════════════════════════════════════════════════╗
║             🎮 Welcome to Riddle Game! 🎮        ║
╠══════════════════════════════════════════════════╣
║ What would you like to do?                       ║
║                                                  ║
║  1. ▶️  Play the game                             ║
║  2. 🧩  Create a new riddle                      ║
║  3. 📖  Read all riddles                         ║
║  4. ✏️  Update a riddle                           ║
║  5. ❌  Delete a riddle                          ║
║  6. 🏆  View leaderboard                         ║
║  0. 🚪 Exit                                      ║
║                                                  ║
╚══════════════════════════════════════════════════╝
👉  Please enter your choice (0-6): 
`;

        let userInput = readline.question(menu);
        //IMPORTENT!!! Fix the user req for delete/ update/ get 
        switch (userInput) {
            case "1":
                console.log("🎮 Let's play the game!");
                //serch by id!, I need to create a smart serch by name 
                const id = readline.question("Please enter yore id, if you dont have enter 0: ")
                if (id === "0") {
                    try {
                        const name = readline.question("Please enter your name: ")
                        // I get an abject
                        const tempUser = await newUser(name)
                        console.log(typeof tempUser, tempUser);

                        // testing if .env work
                        console.log("ip: ", process.env.ipServer, "port: ", process.env.port, "path: ", process.env.pathCreateUser);
                        console.log(`http://${process.env.ipServer}:${process.env.port}/${process.env.pathCreateUser}`)
                        //started to create a user
                        //
                        new Promise(resolve => setTimeout(resolve, 1000))
                        const response = await fetch(`http://${process.env.ipServer}:${process.env.port}/${process.env.pathCreateUser}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(tempUser)
                        });
                        console.log("conect sucsessfuly")

                        console.log("status:", response.status);
                        const result = await response.json()
                        console.log(`sucsess to create a new user, your id is ${result.id}`);
                    }
                    catch (error) {
                        console.log("oopss samting wrong ", error);
                    }
                }

                break;

            case "2":
                console.log("🧩 Creating a new riddle...");
                try {

                    const newRiddle = await riddleTemplate()
                    new Promise(resolve => setTimeout(resolve, 1000))
                    const response = await fetch(`http://${process.env.ipServer}:${process.env.port}/${process.env.pathCreateReiddle}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newRiddle)
                    })
                    console.log("conect sucsessfuly")
                    console.log("status:", response.status);
                    const result = await response.json()
                    console.log(`sucsess to create a new user, your id is ${result.id}`);
                }
                catch (error) {
                    console.log("oopss samting wrong ", error);
                }
                break;

            case "3":
                console.log("📖 Reading all riddles...");

                const riddles = await getAllRiddlesAPI()

                //בקשת מהשרת לקראיה של החידות
                fetch(`http://${process.env.ipServer}:${process.env.port}/${process.env.pathReadRiddle}`)
                //take
                break;
            case "4":
                console.log("✏️ Updating a riddle...");
                //
                fetch(`http://${process.env.ipServer}:${process.env.port}/${process.env.pathUpdateRiddle}`)
                break;
            case "5":
                console.log("❌ Deleting a riddle...");
                fetch(`http://${process.env.ipServer}:${process.env.port}/${process.env.pathDeleteRiddle}`)
                break;
            case "6":
                console.log("🏆 Showing leaderboard...");
                break;
            case "0":
                console.log("👋 Exiting the game. Goodbye!");
                running = false;
                break;
            default:
                console.log("❗ Invalid choice. Please enter a number between 0 and 6.");
        }

        if (running) {
            console.log("\n🔁 Returning to menu...\n");
        }
    }
}

startMene()