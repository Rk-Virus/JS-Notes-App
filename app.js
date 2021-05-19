console.log("script running...");
// initial notes update 
updateNotes();

document.getElementById('addbtn').addEventListener('click', ()=>{

    console.log('add button clicked');
    var text = document.getElementById('userText').value;

    let notes = localStorage.getItem("notes");

    console.log("local storage is ",notes, "input note is ", text); // checking if local storage is null or not

    if(notes == null){
        console.log("creating notes array");
        var notesArr = [];
    }
    else{
        console.log("getting storage value as array");
        notesArr = JSON.parse(notes);
        console.log(notesArr);
    }
    console.log('Updating the array... pushing...')
    notesArr.push(text);
    let notesJsonStr = JSON.stringify(notesArr);

    // adding to local storage .... notes as key and notesJsonStr as value
    localStorage.setItem("notes", notesJsonStr);
    console.log('local storage updated!');

    // clearing input box
    document.getElementById('userText').value = "";

    updateNotes();
})


function updateNotes(){
    console.log('updating list...')
    let notes = localStorage.getItem("notes");
    var notebox = document.getElementsByClassName('noteBox')[0];

    if (notes == null || notes == "[]") {
        notebox.innerHTML = `<h4> Click on add note button to Add your notes </h4>`;
    }
    else{ 
        let notesArr = JSON.parse(notes);        
        var HTML = "";
        
        for (let index = 0; index < notesArr.length; index++) {
            
            HTML += `<div class="card mx-3 my-3" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">Title ${index+1}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Reminder</h6>
            <p class="card-text" >${notesArr[index]}</p>
            <div class="btn btn-danger" id="${index}" onclick="deleteNote(this.id)">Delete</div>
            </div>
            </div>` 
        }
        console.log(HTML);
        
        notebox.innerHTML = HTML;
    }
}


function deleteNote(index) {
    console.log("deleling note...at ",index);
    let notes = localStorage.getItem("notes");
    let notesArr = JSON.parse(notes);
    // deleting notes...
    notesArr.splice(index,1);

    let notesJsonStr = JSON.stringify(notesArr);
    // adding to local storage .... notes as key and notesJsonStr as value
    localStorage.setItem("notes", notesJsonStr);
    console.log('local storage updated!');
    updateNotes();
}

// search and filter feature here
document.getElementById('searchBtn').addEventListener('click', ()=>{
    console.log('Searching...');
    let key = document.getElementById('searchBox').value;
    let cards = document.getElementsByClassName('card-text');

    let noteFount = 0;
    for (let index = 0; index < cards.length; index++) {
        const card = cards[index];
        if(card.innerHTML.toLowerCase().includes(key.toLowerCase())){
            console.log('found!');
            card.parentNode.parentNode.style.display = 'initial';
            noteFount++;
        }
        else{
            card.parentNode.parentNode.style.display = 'none';
        }
    }
    if(noteFount == 0){
        alert("Nothing matched your search!");
    }
    });


document.getElementById('deleteAllBtn').addEventListener('click', ()=>{
    console.log('delete all btn clicked...');
    let sure = confirm('Are you sure? \nYour notes will be deleted permanently!');
    if(sure){
        console.log('deleting all notes...');
        localStorage.clear();
    }
    updateNotes();
})
