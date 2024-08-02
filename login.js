import { GoogleAuthProvider, signInWithEmailAndPassword,createUserWithEmailAndPassword ,signInWithPopup,sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./config.js";



const email = document.querySelector('#email')
const password = document.querySelector('#password')
const googleBtn = document.querySelector('#googlebtn')
const signInBtn = document.querySelector('#signInBtn')
const forgotBtn = document.querySelector('#forgotBtn')





googleBtn.addEventListener('click',()=>{
    
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
    .then((result) => {
        
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        window.location = 'todo.html'
        console.log("add");

        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
    
})





signInBtn.addEventListener('click',()=>{

    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        // Signed up 
    const user = userCredential.user;
        window.location = 'todo.html'
        // console.log(user);
        

    })
    .catch((error) => {
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          window.location ='todo.html'
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        //   let emailError = errorMessage
          alert('Please corect email and password ')
        // console.log('Please corect email and password '+errorCode);


        //   alert('error ===>'+errorMessage)
        });

        console.log('password error');
        // alert('error ===>'+errorMessage)

        // ..


    });

})




forgotBtn.addEventListener('click',()=>{
let newemail = prompt('Enter your email')
// const auth = getAuth();
sendPasswordResetEmail(auth, newemail)
  .then(() => {
    alert('Password reset email sent!');
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // ..
  });
})