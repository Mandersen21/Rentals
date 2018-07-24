// Async and await approach
async function displayUser() {
    const user = await getUser(1);
    console.log("User", user)
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        // Async work here
        setTimeout(() => {
            resolve({userID: 1, user: 'Mikkel'})
        }, 2000)
    })
}