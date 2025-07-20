import readline from 'readline-sync';

//Utiliti function for gave the id on object, if its not atomatic
// export function MaxId(DBPath)
// {
//     let counter = 1;
//     JSON.parse(DBPath).forEach(item => {
//         if ("ID" in item){
//             counter += 1;
//         }
//     });
//     return counter; 
// }

export async function newUser(name, TimeStatistics = 0)
{
   const templitJson =
    {
        // No need counter, its atomatic on supa
        "name": name,
        "TimeStatistics": TimeStatistics
    };
    return templitJson
}
//riddle templite
export function riddleTemplate()
{
    const riddleTemplit = 
    {
        name: readline.question("Plese enter a name: "),
        taskDescription: readline.question("Please enter a question: "),
        correctAnswer: readline.question("Please enter an answer: "),
    }
    return riddleTemplit;
}
