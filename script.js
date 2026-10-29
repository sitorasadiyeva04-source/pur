let users = [];
const limit = 10; // Лимит задан переменной, его можно легко изменить при желании

function fetchUsers() {
    loader(true);

    fetch(`https://dummyjson.com/users?limit=${limit}`)
        .then(r => r.json())
        .then(d => {
            users = d.users.map(u => ({
                name: u.firstName + " " + u.lastName,
                age: u.age,
                picture: u.image
            }));
            displayUsers(users);
        })
        .catch(() => (userList().innerHTML = "Ошибка загрузки"))
        .finally(() => loader(false));
}

function displayUsers(list) {
    userList().innerHTML = list.map(u => `
        <div class="user-card">
            <img src="${u.picture}" alt="">
            <p>${u.name}, ${u.age} лет</p>
        </div>
    `).join("");
}

function sortUsers(type) {
    users.sort((a, b) => type === "name" 
        ? a.name.localeCompare(b.name) 
        : a.age - b.age
    );
    displayUsers(users);
}

function filterUsers() {
    const q = document.getElementById("filterInput").value.toLowerCase();
    displayUsers(users.filter(u => u.name.toLowerCase().includes(q)));
}

function userList() {
    return document.getElementById("userList");
}

function loader(show) {
    document.querySelector(".loader").style.display = show ? "block" : "none";
}

// Автоматический вызов при старте
fetchUsers();