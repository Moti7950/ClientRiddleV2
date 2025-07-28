
export async function serchByID(input) {
    try {
        const response = await fetch(`http://${process.env.ipServer}:${process.env.port}/${process.env.pathSerchById}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        });
        const data = await response.json();
        return data.result;
    }
    catch (error) {
        console.log("oopss samting wrong ", error);
        return false;

    }
} 