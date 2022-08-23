    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
    import {getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyDEmzzxGM03rs5JrUkvb5l-3cvH0kY6jjc",
      authDomain: "to-do-app-a6443.firebaseapp.com",
      projectId: "to-do-app-a6443",
      storageBucket: "to-do-app-a6443.appspot.com",
      messagingSenderId: "640837027927",
      appId: "1:640837027927:web:9abcd1bf7985680227fb12",
      measurementId: "G-JTLVY3EC0N"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getDatabase();

//My code starts from here
var list = document.getElementById("list")



window.createItem =  function(){
    var inputValue = document.getElementById("inputValue");
    
    //Create list item with text
    if(inputValue.value != ""){
         // Create a new post reference with an auto-generated id
        const postListRef = ref(db, 'posts');
        const newPostRef = push(postListRef);
        set(newPostRef, {
        value: inputValue.value,
    });
    //Clear input value
    inputValue.value = "";

    getData();
    }
    else{
        alert("Please, Enter some text.");
    }

   

    

    
}


function getData(){
    
    list.innerHTML = "";
    
    //getting data from database
    const dbRef = ref(db, 'posts/');
    onValue(dbRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();

    //Creating list item
    var li = document.createElement("LI");
        li.setAttribute("class","listItem");
        var liText = document.createTextNode(childData.value); 
        li.appendChild(liText);
        list.appendChild(li);
    
    //Create div
    var btnsDiv = document.createElement("DIV");
    btnsDiv.setAttribute("class","btnsDiv");
    li.appendChild(btnsDiv);
    

    //Create Edit Button
    var editBtn = document.createElement("SPAN");
    editBtn.appendChild(document.createTextNode("Edit"));
    editBtn.setAttribute("class","edit");
    editBtn.setAttribute("id", childKey)
    editBtn.setAttribute("onclick","editItem(this)");
    btnsDiv.appendChild(editBtn);

    //Create Delete Button 
    var delBtn = document.createElement("SPAN");
    delBtn.appendChild(document.createTextNode("Delete"));
    delBtn.setAttribute("class","del");
    delBtn.setAttribute('id',childKey);
    delBtn.setAttribute("onclick","deleteItem(this)");
    btnsDiv.appendChild(delBtn);
  });
},{
  onlyOnce: true
});
}

getData();

window.deleteItem = function(delBtn){
    set(ref(db, 'posts/'+ delBtn.id), { value: null})
    delBtn.parentNode.parentNode.remove();
}

window.editItem =  function(editBtn){ 
    var val = prompt("Enter Updated value", editBtn.parentNode.firstChild.nodeValue);
    set(ref(db, 'posts/'+ editBtn.id), { value: val})
    editBtn.parentNode.firstChild.nodeValue = val;
}

window.deleteAll = function(){
    set(ref(db, 'posts/'), { value: null})
    list.innerHTML = "";
}

