import { collection,addDoc, getDocs,doc,updateDoc,deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { db } from "./config.js";



let form = document.querySelector('#form')
let input = document.querySelector('#input')
let todolist = document.querySelector('#todolist')





const arr = []



// data base se sara data mangwana 

async function getdata(params) {

    todolist.innerHTML = 'Loding...'

    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
        arr.push({...doc.data(), id:doc.id });

    });
    console.log(arr);
    // console.log(arr[0].input);
    
    rendertodo()
    
}
getdata()





// async function getData() {
//     const querySnapshot = await getDocs(collection(db, "todos"));
//     querySnapshot.forEach((doc) => {
//         arr.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(arr);
//     // renderTodo();
//     console.log(arr[0].input);
//   }
  
//   getData();




// new data add karna arry me or array ko database me push karna 



form.addEventListener('submit', async (event) => {

    event.preventDefault()

    if (input.value == '') {
        alert("enter a todo")

    } else {
        
        try {
            const docRef = await addDoc(collection(db, "todos"), {
                // id: docRef.id,
                input: input.value,
            });
            console.log("Document written with ID: ", docRef.id);



            arr.unshift({
                input: input.value,
                id: docRef.id
            })
            rendertodo()

input.value=""


        } catch (error) {
            console.log(error);

        }
    }



}

)




// sare todos screen per render karne ka function


function rendertodo() {
    todolist.innerHTML = ''
    if (arr.length == 0) {

        todolist.innerHTML = 'No data found..!'
        return
    }


    arr.map((element, index) => {
        todolist.innerHTML += `<li>${element.input}</li> 
        <button id="edit">Edit</button>
        <button id="delet">Delet</button>`

    })



    // todo edit karne ka function

    let edit = document.querySelectorAll('#edit')
    edit.forEach((element, index) => {
        element.addEventListener('click', async () => {


            let newtodo = prompt('edit todo value')


            const washingtonRef = doc(db, "todos", arr[index].id);

            await updateDoc(washingtonRef, {
                input: newtodo

            });
            arr[index].input = newtodo

            console.log("edit" + index);
            rendertodo()

        })
    })


    

    // todo delet karne ka function

    let delet = document.querySelectorAll('#delet')
    delet.forEach((element, index) => {
        element.addEventListener('click', async () => {


            await deleteDoc(doc(db, "todos", arr[index].id));
            arr.splice(index, 1)

            console.log("delet" + index);
            rendertodo()
        })
    })


}


