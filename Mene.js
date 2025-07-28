import readline from 'readline-sync';
import 'dotenv/config'
import { newUser, riddleTemplate, templateRiddleChenge, Leaderboard } from './utils/utilityFunction.js';

import { serchByID } from "./func/menuFunction.js"

let running = true;

export async function startMene() {
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
        switch (userInput) {
            case "1":
                console.log("🎮 Let's play the game!");
                //serch by id!, I need to create a smart serch by name 
                const input = readline.question("Please enter yoru id or name: ")

            

                let query;
                if (!isNaN(input)) {
                    // אם הקלט מספרי, נשתמש בשדה id
                    query = { id: Number(input) };
                } else {
                    // אם הקלט טקסט, נשתמש בשדה name
                    query = { name: input };
                }

                const connectToDB = await serchByID(query);
                console.log(connectToDB);

                if (!connectToDB) {
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
                    const response = await fetch(`http://${process.env.ipServer}:${process.env.port}/${process.env.pathReadRiddle}`)
                    const result = await response.json();
                    const riddles = result.data;

                    const timePerQuestion = [];
                    const startTime = Date.now();

                    for (const riddle of riddles) {
                        let userAnswer = "";
                        console.log("🧩 Question:", riddle.taskDescription);

                        const questionStart = Date.now();

                        while (userAnswer !== riddle.correctAnswer) {
                            userAnswer = readline.question("enter your answer: ");
                            if (userAnswer !== riddle.correctAnswer) {
                                console.log("Incorrect 😢");
                            } else {
                                console.log("Correct 😁");
                            }
                        }

                        const questionEnd = Date.now();
                        const duration = (questionEnd - questionStart) / 1000;
                        timePerQuestion.push(duration);
                    }

                    const endTime = Date.now();
                    const totalTime = (endTime - startTime) / 1000;
                    const averageTime = timePerQuestion.reduce((a, b) => a + b, 0) / timePerQuestion.length;

                    console.log("\n🕒 Game Summary:");
                    console.log("⏱️ Total time:", totalTime.toFixed(2), "seconds");
                    console.log("📊 Average time per question:", averageTime.toFixed(2), "seconds");
                    console.log("⏲️ Time per question:", timePerQuestion);
                    console.log(`http://${process.env.ipServer}:${process.env.port}/${process.env.pathUpdateUser}${input}`);
                    
                    const responseu = await fetch(`http://${process.env.ipServer}:${process.env.port}/${process.env.pathUpdateUser}${input}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ timestatistics : averageTime }) // שליחה בגוף הבקשה
                    });


                    const result1 = await responseu.json();
                    console.log("📝 Update result:", result1);

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
            //Work V
            case "4":
                console.log("✏️ Updating a riddle...");
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
            //Work V
            case "5":
                console.log("❌ Deleting a riddle...");

                const idToDelete = readline.question("Please enter id for delete: ")
                try {
                    const response = await fetch(`http://${process.env.ipServer}:${process.env.port}/${process.env.pathDeleteRiddle}${idToDelete}`, {
                        method: "DELETE"
                    })
                    const result = await response.text()
                    console.log("Server response:", result);
                }
                catch (err) {
                    console.log(err);
                }
                break;

            case "6":
                console.log("🏆 Showing leaderboard...");
                console.log(await Leaderboard());
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

