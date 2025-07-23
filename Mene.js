import readline from 'readline-sync';
import 'dotenv/config'
import { newUser, riddleTemplate, templateRiddleChenge } from './utils/utilityFunction.js';

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
                //צריך לעשות משתנה ששומר את הערך של הלקוח ובודק האם הוא בתוך הDB בשביל לחפש אותו או ליצור אותו, וכמובן לשנות את התנאים
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
                        await new Promise(resolve => setTimeout(resolve, 1000))
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
                else {
                    //פה אני צריך לעשות לולאה שרצה ובודקת האם התשובה נכונה אם כן לקדם לשאלה הבא
                    // console.log(`🔍 Trying to fetch from: http://${process.env.ipServer}:${process.env.port}/${process.env.pathReadRiddle}`);
                    const response = await fetch(`http://${process.env.ipServer}:${process.env.port}/${process.env.pathReadRiddle}`)
                    const data = await response.json();
                    console.log(data);
                }
                break;
            //Work V
            case "2":
                console.log("🧩 Creating a new riddle...");
                try {

                    const newRiddle = await riddleTemplate()
                    await new Promise(resolve => setTimeout(resolve, 1000))
                    console.log(typeof newRiddle, newRiddle);

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

            //Work V
            case "3":
                console.log("📖 Reading all riddles...");
                const response = await fetch(`http://${process.env.ipServer}:${process.env.port}/${process.env.pathReadRiddle}`)
                const data = await response.json();
                console.log(data);
                console.log("--------------END---------------");
                break;
            case "4":
                console.log("✏️ Updating a riddle...");
                //
                const temp = templateRiddleChenge()
                console.log(typeof temp, temp);
                const idChenge = readline.question("Please enter your id: ")
                try {
                    const response = await fetch(`http://${process.env.ipServer}:${process.env.port}/${process.env.pathUpdateRiddle}${idChenge}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(temp)
                    });
                    const result = await response.text()
                    console.log("Success update:", result);
                } catch (error) {
                    console.error(" Error:", error);
                }
                break;
            case "5":
                console.log("❌ Deleting a riddle...");
                fetch(`http://${process.env.ipServer
                    }: ${process.env.port} / ${process.env.pathDeleteRiddle}`)
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