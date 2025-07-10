import readline from 'readline-sync';
import 'dotenv/config'

let running = true;

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
            //בקשת קריאה לשרת ליצירת משתמש
            fetch(`http://${process.env.ipServer}:${process.env.port}/${process.env.pathCreateUser}`)
                .then(res => {

                })
                //start game & teake time
                .then(data => {
                    // console.log(data);
                })
            //take end time & statictic time

            break;
        case "2":
            console.log("🧩 Creating a new riddle...");
            // בקשת יצירת חידה למשתמש 
            break;
        case "3":
            console.log("📖 Reading all riddles...");
            //בקשת מהשרת לקראיה של החידות
            fetch(`http://${process.env.ipServer}:${process.env.port}/${process.env.pathReadRiddle}`)
                .then(res => {

                })
                //start game & teake time
                .then(data => {
                    // console.log(data);
                })
            //take
            break;
        case "4":
            console.log("✏️ Updating a riddle...");
            //
                      fetch(`http://${process.env.ipServer}:${process.env.port}/${process.env.pathUpdateUser}`)
                .then(res => {

                })
                //start game & teake time
                .then(data => {
                    // console.log(data);
                })
            break;
        case "5":
            console.log("❌ Deleting a riddle...");
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
