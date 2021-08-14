//----GLOBOL VARIABLE
let todoList = [{id: 0, 
                 name: "Eat", 
                 des: "Everybody need to eat at least 3 time a day",
                 sub: ["breakfast", "lunch", "dinner"]}, 
                 {id: 1, 
                 name: "rest", 
                 des: "Goot think if you have a good rest", 
                 sub: ["afternoon rest", "evening rest"]}];

const listHolder = document.querySelector("ul");

//-------DISPLAY TODO LIST

function subItem(subs, i, barId){
    let sub = ` <label for = ${i}><input type="checkbox" name= ${i} id= ${i} value="false" onchange="progress(this.checked, ${barId})">
    ${subs}</label>`;
    return sub;
}

function progress(change, id){
     let progres = document.getElementById(id);
     if(change) {
         progres.value +=1;
     } else {
         progres.value -=1;
     }
}

function generateId(){
  todoList = todoList.map((task, i) => { return{...task, id: i}});
}

function listItem (list){
    let subs =""; 
    for (let i = 0; i < list.sub.length; i++) {
        let id = list.id.toString() + i.toString();
        let elem = subItem(list.sub[i], id, list.id);
        subs += elem;  
    };

    let item = `
    <li>
      <h3>${list.name}</h3>
      <p>${list.des}</p>
       <div>
         ${subs}
       </div>    
      <label for=${list.id}>Completed: <progress id=${list.id} value="0" max=${list.sub.length}></progress></label>
      <button type="button" class = "delete" onClick="deleteTask(${list.id})">Delete Task</button>
      </li>
    `;
    return item;
}

function deleteTask(id) {
   todoList =  todoList.filter(todo => id !== todo.id);
    generateId();
    populateList(todoList);
}

function populateList (lists) {
  const taskList= lists.map(listItem);  
  listHolder.innerHTML = taskList;
}

//--------FORM

let subform = 0;
const submitBtn = document.querySelector("#create");
submitBtn.addEventListener("click", handleForm);
const addBtn = document.querySelector("#addStage");
addBtn.addEventListener("click", addSubTask);
const subContainer = document.querySelector(".generated");


function handleForm() {
 const todoForm = document.querySelector("form");
 let valid = true;
 let name = "";
 if (todoForm.elements[0].value !== "") {
   name = todoForm.elements[0].value;
   valid = true;
 } else {
   valid = false;
   todoForm.elements[0].setAttribute("style", "border:2px solid red");
 }

 let des = todoForm.elements[1].value;
 

 let sub = [];
 for (let i = 2; i < todoForm.elements.length-2; i++) {
   if (todoForm.elements[i].value !== "") {
     sub.push(todoForm.elements[i].value);
     if (i ===2) {
       valid = true;
     }
   } else {
     if (i === 2) {
      valid = false;
      todoForm.elements[2].setAttribute("style", "border:2px solid red");
     }
   }
 }
 if (valid) {
    newTodo(name, des, sub);
    clearForm(todoForm);
 }
 
}

function clearForm(todoForm) {
  todoForm.elements[0].value = "";
  if (todoForm.elements[0].hasAttribute("style")) {
    todoForm.elements[0].removeAttribute("style");
  }
  todoForm.elements[1].value = "";
  todoForm.elements[2].value = "";
    if (todoForm.elements[2].hasAttribute("style")) {
      todoForm.elements[2].removeAttribute("style");
    }
  subContainer.innerHTML = ``;  
  subform = 0;
}

function addSubTask() {
  ++subform;
  const subField = document.createElement("input");
  subField.setAttribute("type", "text");
  subField.setAttribute("name", "substage"+subform.toString());
  subField.setAttribute("id", "substage"+subform.toString());
  const subLabel = document.createElement("label");
  subLabel.htmlFor = "substage"+subform.toString();
  subLabel.textContent = "New subtask";
  subContainer.appendChild(subLabel);
  subContainer.appendChild(subField);

}

//------CREATING NEW TODO

function newTodo(name, des, sub) {
  let task = {
    id: 0,
    name: name,
    des: des,
    sub: sub,
  }
  todoList.push(task);
  generateId();
  populateList(todoList);
}

populateList (todoList);

