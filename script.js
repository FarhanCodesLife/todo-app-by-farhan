import { collection,addDoc, getDocs,doc,updateDoc,deleteDoc,Timestamp,query, where,user ,orderBy} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import {  db,auth } from "./config.js";
import { onAuthStateChanged  ,signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";



let form = document.querySelector('#form')
let input = document.querySelector('#input')
let todolist = document.querySelector('#todolist')



const logoutBtn =document.querySelector('#logoutBtn')


onAuthStateChanged(auth, (user) => {
    if (user) {
          console.log(user);
        //    user
        console.log('ok');
        
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
    } else {
          window.location = 'index.html'
        // User is signed out
        console.log('not ok');
        // ...
      }
    });


    logoutBtn.addEventListener('click',()=>{

        
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    })
      






const arr = []



// data base se sara data mangwana 

async function getdata(params) {

    todolist.innerHTML = 'Loding...'
    const q = query(collection(db, "todos"), orderBy("time", "desc"));
    const querySnapshot = await getDocs(q);

    // const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
        arr.push({...doc.data(), id:doc.id ,email:user.email,userid:user.uid});

    });
    console.log(arr);
    // console.log(arr[0].input);
    
    rendertodo()
    
}
getdata()







form.addEventListener('submit', async (event) => {

    event.preventDefault()

    if (input.value == '') {
        alert("enter a todo")

    } else {
        
        try {
            const docRef = await addDoc(collection(db, "todos"), {
                // id: docRef.id,
                input: input.value,
                email:user.email,
                userid:user.uid,
                time: Timestamp.fromDate(new Date()),
            });
            console.log("Document written with ID: ", docRef.id);



            arr.unshift({
                input: input.value,
                id: docRef.id,
                email:user.email,
                userid:user.uid,
            })
            rendertodo()



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
        todolist.innerHTML += `
        <li>${element.input}</li>
        <li>${element.email}</li>
        <p>${element.time ? element.time.toDate():'to time detected'}</p>
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


