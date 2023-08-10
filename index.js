import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://noter-4f730-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const noteItemsDB = ref(database, "noteItems")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const listEl = document.getElementById("list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(noteItemsDB, inputValue)

    clearInputFieldEl()
})

onValue(noteItemsDB, function(snapshot) {
    let itemsArray = Object.values(snapshot.val())
    clearListEl()
    for (let i = 0 ; i < itemsArray.length ; i++) {
        appendItem(itemsArray[i])
    }
})

function clearListEl() {
    listEl.innerHTML = ""
}

function clearInputFieldEl(){
    inputFieldEl.value = ""
}
function appendItem(item){
    listEl.innerHTML += `<li>${item}</li>`
}