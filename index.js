import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
	getDatabase,
	ref,
	push,
	onValue,
	remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

//owner only access for now, public access XX
const appSettings = {
	databaseURL:
		"https://noter-4f730-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
//replace the above databaseURL to your own
const app = initializeApp(appSettings);
const database = getDatabase(app);
const noteItemsDB = ref(database, "noteItems");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const listEl = document.getElementById("list");

addButtonEl.addEventListener("click", function () {
	let inputValue = inputFieldEl.value;
	push(noteItemsDB, inputValue);

	clearInputFieldEl();
});

onValue(noteItemsDB, function (snapshot) {
	if (snapshot.exists()) {
		let itemsArray = Object.entries(snapshot.val());

		clearListEl();

		for (let i = 0; i < itemsArray.length; i++) {
			let currentItem = itemsArray[i];
			appendItem(currentItem);
		}
	} else {
		listEl.innerHTML = " no notes added or all notes removed ";
	}
});

function clearListEl() {
	listEl.innerHTML = "";
}

function clearInputFieldEl() {
	inputFieldEl.value = "";
}
function appendItem(item) {
	let itemID = item[0];
	let itemValue = item[1];

	let newListItem = document.createElement("li");
	newListItem.textContent = itemValue;

	newListItem.addEventListener("click", function () {
		let itemIDToBeRemoved = ref(database, `noteItems/${itemID}`);
		remove(itemIDToBeRemoved);
	});

	listEl.append(newListItem);
}
