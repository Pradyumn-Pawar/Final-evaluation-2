// Add the following JavaScript code to the existing script.js file

const taskForm = document.getElementById("task-form");
const taskTableBody = document.querySelector("#task-table tbody");
const searchInput = document.getElementById("search-input");


const editFormContainer = document.getElementById("edit-form-container");
const editForm = document.getElementById("edit-form");
const editActivityInput = document.getElementById("edit-activity-input");
const editStartDateInput = document.getElementById("edit-start-date-input");
const editEndDateInput = document.getElementById("edit-end-date-input");
const editStatusSelect = document.getElementById("edit-status-select");

const activityInput = document.getElementById("activity-input");



const startDateInput = document.getElementById("start-date-input");
const endDateInput = document.getElementById("end-date-input");
const statusSelect = document.getElementById("status-select");

startDateInput.addEventListener('change', disableOptions);
endDateInput.addEventListener('change', disableOptions);

editStartDateInput.addEventListener('change',disableEOptions);
editEndDateInput.addEventListener('change',disableEOptions);

// editStartDateInput.addEventListener('change', disableOptions);
// editEndDateInput.addEventListener('change', disableOptions);
let filterIn=[];
let tasks = [];
let currentIndex;
taskForm.addEventListener("submit", function(event) {
  event.preventDefault();
 
  const activity = activityInput.value;
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;
  const status = statusSelect.value;

  if (validateform() && activity && startDate && endDate && status) {
    addTask(activity, startDate, endDate, status);
    taskForm.reset();
  }
  
});


function validateform(){
    let isValid = true
    // const activityInput = document.getElementById("activity-input");
    // const startDateInput = document.getElementById("start-date-input");
    // const endDateInput = document.getElementById("end-date-input");
    // const statusSelect = document.getElementById("status-select");
    const activityError =document.getElementById("activity-input-error");
    const startDateError = document.getElementById("start-date-input-error");
    const endDateError = document.getElementById("end-date-input-error");
    const statusSelectError = document.getElementById("status-select-error");


    const activity = activityInput.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const status = statusSelect.value;

    const start =new  Date(startDate)
    const end = new Date(endDate)

    if(!activity){
        activityError.innerText="Activity field can not be empty"
        console.log("enter Name")
        isValid =false
    }else if(/^[\w ]*$/.test(activity)){
        console.log("valid name")
        activityError.innerText=""
    }else{
        activityError.innerText="Activity can not contain special characters"
        console.log("invalid name")
        isValid=false
    }

    if(!startDate){
        startDateError.innerText="Enter start date"
        console.log("enter START the dates")
        isValid=false
    }else{
        startDateError.innerText=""
    }
    if(!endDate){
        endDateError.innerText="Enter end date"
        console.log("enter END the dates")
            isValid=false
    }else{
        endDateError.innerText=""
    }

    if(startDate>endDate){
        endDateError.innerText="Invalid End Dates"
    }

    if(!status){
        statusSelectError.innerText="Enter the status of activity"
        console.log("enter status   ")
        isValid=false
    }else{
        statusSelectError.innerText=""
    }

    
    return isValid
}

function disableOptions() { 
    const startDate = new Date(startDateInput.value).setHours(0,0,0,0);
    const endDate = new Date(endDateInput.value).setHours(0,0,0,0);
    const todayDate = new Date().setHours(0,0,0,0);
    // Enable all options
    for (let i = 1; i < statusSelect.options.length; i++) {
      statusSelect.options[i].disabled = false;
    }
  

     if(startDate > todayDate){
            statusSelect.options[3].disabled=true;
            statusSelect.options[2].disabled=true;
            statusSelect.options[4].disabled =true;
            
        }else if(startDate===todayDate){
            statusSelect.options[4].disabled=true; 
        }
        
    if(endDate<todayDate){
        statusSelect.options[1].disabled=true;
        statusSelect.options[2].disabled=true;
    }else if(endDate===todayDate){
        console.log(endDate ," ++ ",todayDate)

        statusSelect.options[4].disabled=true; //due passed
        
    }else if(endDate>todayDate){
       
        statusSelect.options[4].disabled=true;
    }   



    if (startDate > endDate) {
        // If start date is after end date, disable "In-Progress" and "Completed" options
        statusSelect.options[1].disabled = true; // In-Progress
        statusSelect.options[2].disabled = true;
        statusSelect.options[3].disabled = true; // In-Progress
        statusSelect.options[4].disabled = true;
       
        
        console.log("create a error msg /all options are diabled")
         // Completed
      }  

  }

  function disableEOptions() { 
    const startDate = new Date(editStartDateInput.value).setHours(0,0,0,0);
    const endDate = new Date(editEndDateInput.value).setHours(0,0,0,0);
    const todayDate = new Date().setHours(0,0,0,0);
    // Enable all options
    for (let i = 1; i < editStatusSelect.options.length; i++) {
        editStatusSelect.options[i].disabled = false;
    }
  

    if(startDate<todayDate){
        editStatusSelect.options[4].disabled=true; 
    }else if(startDate > todayDate){
        editStatusSelect.options[3].disabled=true;
        editStatusSelect.options[2].disabled=true;
        editStatusSelect.options[4].disabled =true;
            
        }else if(startDate===todayDate){
            editStatusSelect.options[4].disabled=true; 
        }
        
    if(endDate<todayDate){
        editStatusSelect.options[1].disabled=true;
        editStatusSelect.options[2].disabled=true;
    }else if(endDate===todayDate){
        console.log(endDate ," ++ ",todayDate)

        editStatusSelect.options[4].disabled=true; //due passed
        
    }else if(endDate>todayDate){
       
        editStatusSelect.options[4].disabled=true;
    }   



    if (startDate > endDate) {
        // If start date is after end date, disable "In-Progress" and "Completed" options
        editStatusSelect.options[1].disabled = true; // In-Progress
        editStatusSelect.options[2].disabled = true;
        editStatusSelect.options[3].disabled = true; // In-Progress
        editStatusSelect.options[4].disabled = true;
       
        
        console.log("create a error msg /all options are diabled")
         // Completed
      }  

  }



function addTask(activity, startDate, endDate, status) {
  const newTask = {
    activity,
    startDate,
    endDate,
    status
  };

  tasks.push(newTask);
  renderTasks();
  
}

function renderTasks() {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      };
    filterIn=[]
  taskTableBody.innerHTML = "";

  tasks.forEach(function(task, index) {
    filterIn.push(index)
    const row = document.createElement("tr");

    const activityCell = document.createElement("td");
    activityCell.textContent = task.activity;

    const startDateCell = document.createElement("td");
    startDateCell.textContent = task.startDate;

    const endDateCell = document.createElement("td");
    endDateCell.textContent = task.endDate;

    const statusCell = document.createElement("td");
    statusCell.textContent = task.status;

    

     const actionsCell = document.createElement("td");
     if(task.status==="Completed"){
          
        activityCell.style.textDecoration ="line-through"
        startDateCell.style.textDecoration ="line-through"
        endDateCell.style.textDecoration ="line-through"
        // statusCell.style.textDecoration ="line-through"
        statusCell.style.color="green"
        actionsCell.style.textDecoration="none" 
        
    }

    if(task.status==="In-Progress"){
        statusCell.style.color="#E49B0F"
    }

    if(task.status==="Pending"){
        statusCell.style.color="red"
    }
    if(task.status==="Due-Passed"){
        statusCell.style.color="#808080"
    }
    // const editButton = document.createElement("button");
    actionsCell.innerHTML = `<button class="edit" onclick='openEditForm(currentIndex)'>Edit</button> <button class="delete" onclick='deleteTask()'> Delete</button>`;
    
  
    row.appendChild(activityCell);
    row.appendChild(startDateCell);
    row.appendChild(endDateCell);
    row.appendChild(statusCell);
    row.appendChild(actionsCell);

    taskTableBody.appendChild(row);
  });
}

function deleteTask(index) {
    event.preventDefault()
    selectedRow = event.target.parentElement.parentElement;
    selectedRowIndex = selectedRow.rowIndex-1;

    currentIndex=selectedRowIndex
    console.log("selected row",currentIndex,filterIn.at(currentIndex))
  tasks.splice(filterIn.at(currentIndex), 1);
  searchTask()
  renderFilteredTasks(filteredTasks);
}
function validateEform(index){
    let isValid = true
    // const activityInput = document.getElementById("activity-input");
    // const startDateInput = document.getElementById("start-date-input");
    // const endDateInput = document.getElementById("end-date-input");
    // const statusSelect = document.getElementById("status-select");
    const editForm = document.getElementById("edit-form");
    const editActivityInput = document.getElementById("edit-activity-input");
    const editStartDateInput = document.getElementById("edit-start-date-input");
    const editEndDateInput = document.getElementById("edit-end-date-input");
    const editStatusSelect = document.getElementById("edit-status-select");

    const activityError =document.getElementById("activity-einput-error");
    const startDateError = document.getElementById("start-date-einput-error");
    const endDateError = document.getElementById("end-date-einput-error");
    const statusSelectError = document.getElementById("status-eselect-error");


    const activity = editActivityInput.value;
    const startDate = editStartDateInput.value;
    const endDate = editEndDateInput.value;
    const status = editStatusSelect.value;

    const start =new  Date(startDate)
    const end = new Date(endDate)

    console.log("E",activity)

    if(!activity){
        activityError.innerText="Activity field can not be empty"
        console.log("enter Name")
        isValid =false
    }else if(/^[\w ]*$/.test(activity)){
        console.log("valid name")
        activityError.innerText=""
    }else{
        activityError.innerText="Activity can not contain special characters"
        console.log("invalid name")
        isValid=false
    }

    if(!startDate){
        startDateError.innerText="Enter start date"
        console.log("enter START the dates")
        isValid=false
    }else{
        startDateError.innerText=""
    }

    if(!endDate){
        endDateError.innerText="Enter end date"
        console.log("enter END the dates")
            isValid=false
    }else{
        endDateError.innerText=""
    }

    if(startDate>endDate){
        endDateError.innerText="Invalid End Dates"
        isValid=false
    }

    if(!status){
        statusSelectError.innerText="Enter the status of activity"
        console.log("enter status   ")
        isValid=false
    }else{
        statusSelectError.innerText=""
    }

    
    return isValid
}
function openEditForm(index) {
    event.preventDefault()
    selectedRow = event.target.parentElement.parentElement;
    selectedRowIndex = selectedRow.rowIndex-1;

    currentIndex=selectedRowIndex


    console.log("opening the index", index)
    // console.log(currentIndex,selectedRowIndex,tasks)
    // console.log(index ,"submit",tasks[currentIndex])
  const task = tasks[filterIn.at(currentIndex)];

  editActivityInput.value = task.activity;
  editStartDateInput.value = task.startDate;
  editEndDateInput.value = task.endDate;
  editStatusSelect.value = task.status;
 
  

    
  editFormContainer.style.display = "block";
  
}


function updateRecord(){
    event.preventDefault()
    const newActivity = editActivityInput.value;
    const newStartDate = editStartDateInput.value;
    const newEndDate = editEndDateInput.value;
    const newStatus = editStatusSelect.value;

    console.log(newActivity)

    
    if (validateEform(filterIn.at(currentIndex)) && newActivity && newStartDate && newEndDate && newStatus) {
      tasks[filterIn.at(currentIndex)] = {
        activity: newActivity,
        startDate: newStartDate,
        endDate: newEndDate,
        status: newStatus
      };

      
      closeEditForm();
      console.log(currentIndex,"updated",tasks[filterIn.at(currentIndex)])
      searchTask()
      renderFilteredTasks(filteredTasks);
    }


}


function closeEditForm() {
    event.preventDefault()  
    editForm.reset();
  editFormContainer.style.display = "none";

}
function searchTask() {
    filterIn=[];
  const searchTerm = searchInput.value.toLowerCase();
  const filteredTasks = tasks.filter(function(task,index) {
    if(task.activity.toLowerCase().includes(searchTerm) ||
    task.startDate.toLowerCase().includes(searchTerm) ||
    task.endDate.toLowerCase().includes(searchTerm) ||
    task.status.toLowerCase().includes(searchTerm)){
        filterIn.push(index)
        return true
    }else{
        return false
    }
   
  });
  renderFilteredTasks(filteredTasks);
  console.log("Filter Array",filterIn)
}

searchInput.addEventListener("input", searchTask);

function renderFilteredTasks(filteredTasks) {
  taskTableBody.innerHTML = "";

  filteredTasks.forEach(function(task, index) {
   
    const row = document.createElement("tr");

    const activityCell = document.createElement("td");
    activityCell.textContent = task.activity;

    const startDateCell = document.createElement("td");
    startDateCell.textContent = task.startDate;

    const endDateCell = document.createElement("td");
    endDateCell.textContent = task.endDate;

    const statusCell = document.createElement("td");
    statusCell.textContent = task.status;

    const actionsCell = document.createElement("td");

    
    if(task.status==="Completed"){
          
        activityCell.style.textDecoration ="line-through"
        startDateCell.style.textDecoration ="line-through"
        endDateCell.style.textDecoration ="line-through"
        // statusCell.style.textDecoration ="line-through"
        statusCell.style.color="green"
        actionsCell.style.textDecoration="none" 
        
    }

    if(task.status==="In-Progress"){
        statusCell.style.color="#E49B0F"
        
    }

    if(task.status==="Pending"){
        statusCell.style.color="red"
    }
    if(task.status==="Due-Passed"){
        statusCell.style.color="#808080"
    }
    actionsCell.innerHTML = `<button class="edit" onclick='openEditForm(currentIndex)'>Edit</button> <button class="delete" onclick='deleteTask()'> Delete</button>`;
    

    // const editButton = document.createElement("button");
    // editButton.textContent = "Edit";
    // editButton.addEventListener("click", function() {
    //   openEditForm(filterIn.at(index));
    // });

    // const deleteButton = document.createElement("button");
    // deleteButton.textContent = "Delete";
    // deleteButton.addEventListener("click", function() {
    //     console.log(filterIn.at(index))
    //   deleteTask(filterIn.at(index));
    // });

    // actionsCell.appendChild(editButton);
    // actionsCell.appendChild(deleteButton);

    row.appendChild(activityCell);
    row.appendChild(startDateCell);
    row.appendChild(endDateCell);
    row.appendChild(statusCell);
    row.appendChild(actionsCell);

    taskTableBody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  renderTasks();
});




