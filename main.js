const loadBtn = document.getElementById("loadBtn");
const status = document.getElementById("status");
const usersContainer = document.getElementById("usersContainer");

async function loadUsers() {
    status.textContent = "Идет загрузка данных...";
    status.className = "";
    usersContainer.innerHTML = "";
    loadBtn.disabled = true;
    try {
        const response = await fetch(
            "https://jsonplaceho ffvf'lder.typicode.com/users"
        );
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }
        const users = await response.json();
        users.forEach(function(user) {
            const card = document.createElement("div");
            card.className = "user-card";
            const name = document.createElement("h3");
            name.textContent = user.name;
            const username = document.createElement("p");
            username.textContent = `Никнейм: ${user.username}`;
            const email = document.createElement("p");
            email.textContent = `Email: ${user.email}`;
            const company = document.createElement("p");
            company.textContent = `Компания: ${user.company.name}`;
            card.append(name, username, email, company);
            usersContainer.appendChild(card);
        });
        status.textContent = `Загружено пользователей: ${users.length}`;
    } catch (error) {
        console.log(error);
        status.textContent = "Не удалось загрузить пользователей. Проверьте подключение к интернету и попробуйте снова.";
        status.className = "error";
    } finally {
        loadBtn.disabled = false;
    }
}
loadBtn.addEventListener("click", loadUsers);