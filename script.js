import {collection,addDoc,getDocs,setDoc, updateDoc} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
  import { db } from "./config.js";
  


let form = document.querySelector('#form')
let input =document.querySelector('#input')
let todolist =document.querySelector('#todolist')



const arr = []



async function getdata(params) {

    todolist.innerHTML ='Loding...'

const querySnapshot = await getDocs(collection(db, "todos"));
querySnapshot.forEach((doc) => {
    arr.push(doc.data())

});
rendertodo()
input.value=""

}
getdata()

form.addEventListener('submit',async (event)=>{

    event.preventDefault()

    if (input.value == '') {
        alert("enter a todo")
        
    }else{
        arr.unshift({
            input:input.value
        })

    //     console.log(arr);
    
    
    rendertodo()
    try {
        
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "todos"), {
        
        input:input.value
    });
    console.log("Document written with ID: ", docRef.id);

    } catch (error) {
        console.log(error);
        
    }
}
    input.value=""


    }

)
    




function rendertodo() {
    todolist.innerHTML =''
    if (arr.length == 0) {
        
        todolist.innerHTML = 'No data found..!'
        return
    }


    arr.map((element)=>{
        todolist.innerHTML += `<li>${element.input}</li> 
        <button id="edit">Edit</button>
        <button id="delet">Delet</button>`

    })
    
}



// error 


// let edit = document.querySelectorAll('#edit')


// edit.addEventListener('click', async (event)=>{

//     event.preventDefault()
//     newtodo = prompt('edit todo value')

//     const frankDocRef = doc(db, "todos", input);
//     await setDoc(frankDocRef, {
//         input:newtodo.value
        
//     });
    
//     // To update age and favorite color:
//     await updateDoc(frankDocRef, {
//         "age": 13,
//         "favorites.color": "Red"
//     });

//     rendertodo()
    
// })





// error


// let delet = document.querySelectorAll('#delet')

// delet.addEventListenerall('click',(event)=>{
//     event.preventDefault()
//     console.log("delet button");
// })
