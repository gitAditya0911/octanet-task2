// Récupération des éléments du DOM
const newTaskInput = document.getElementById("newTaskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Gestionnaire d'événement pour l'ajout de tâche
addTaskBtn.addEventListener("click", (event) => {
	event.preventDefault(); // Empêcher le formulaire de se soumettre
	const taskText = newTaskInput.value.trim(); // Récupérer le texte de la nouvelle tâche

	if (taskText !== "") { // Vérifier si le texte est vide
		// Créer un nouvel élément de tâche
		const newTaskItem = document.createElement("li");
		newTaskItem.innerHTML = `
			<span>${taskText}</span>
			<button class="editBtn">Edit</button>
			<button class="deleteBtn">Delete</button>
		`;
		taskList.appendChild(newTaskItem); // Ajouter l'élément de tâche à la liste
		newTaskInput.value = ""; // Effacer le champ d'entrée
	}
});

// Gestionnaire d'événement pour la modification et la suppression de tâche
taskList.addEventListener("click", (event) => {
	const clickedBtn = event.target; // Récupérer l'élément cliqué

	if (clickedBtn.classList.contains("deleteBtn")) {
		// Supprimer l'élément de tâche
		const taskItem = clickedBtn.closest("li");
		taskItem.remove();
	}
	else if (clickedBtn.classList.contains("editBtn")) {
		// Passer en mode édition
		const taskItem = clickedBtn.closest("li");
		const taskTextSpan = taskItem.querySelector("span");
		const taskText = taskTextSpan.textContent;
		const editInput = document.createElement("input");
		editInput.type = "text";
		editInput.value = taskText;
		editInput.classList.add("editInput");
		taskItem.classList.add("edit-mode");
		taskTextSpan.replaceWith(editInput);
		clickedBtn.textContent = "Save"; // Changer le texte du bouton pour "Save"
	}
	else if (clickedBtn.textContent === "Save") {
		// Enregistrer la tâche modifiée
		const taskItem = clickedBtn.closest("li");
		const editInput = taskItem.querySelector(".editInput");
		const newTaskText = editInput.value.trim();
		const taskTextSpan = document.createElement("span");
		taskTextSpan.textContent = newTaskText;
		editInput.replaceWith(taskTextSpan);
		taskItem.classList.remove("edit-mode");
		clickedBtn.textContent = "Edit"; // Changer le texte du bouton pour "Edit"
	}
});