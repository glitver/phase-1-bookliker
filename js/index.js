document.addEventListener("DOMContentLoaded", function() {
    const listPanel = document.getElementById("list-panel");
    const showPanel = document.getElementById("show-panel");

    function fetchBooks() {
        fetch("http://localhost:3000/books")
            .then(response => response.json())
            .then(data => {
                data.books.forEach(book => {
                    const li = document.createElement("li");
                    li.textContent = book.title;
                    li.addEventListener("click", () => displayBookDetails(book));
                    listPanel.querySelector("ul").appendChild(li);
                });
            })
            .catch(error => console.error("Error fetching books:", error));
    }

    function displayBookDetails(book) {
        showPanel.innerHTML = ""; 
        const img = document.createElement("img");
        img.src = book.img_url;
        img.alt = book.title;
        showPanel.appendChild(img);

        const description = document.createElement("p");
        description.textContent = book.description;
        showPanel.appendChild(description);

        const likeButton = document.createElement("button");
        likeButton.textContent = "Like";
        likeButton.addEventListener("click", () => likeBook(book));
        showPanel.appendChild(likeButton);

        const userList = document.createElement("ul");
        book.users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = user.username;
            userList.appendChild(li);
        });
        showPanel.appendChild(userList);
    }

    function likeBook(book) {
        const currentUser = { id: 1, username: "pouros" }; // Assuming user is always pouros for simplicity
        const updatedUsers = [...book.users, currentUser];
        const patchData = { users: updatedUsers };

        fetch(`http://localhost:3000/books/${book.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patchData)
        })
        .then(response => response.json())
        .then(data => {
            displayBookDetails(data);
        })
        .catch(error => console.error("Error liking book:", error));
    }
    fetchBooks();
});
