let editBox,editButton,saveButton,labelText,selectButton,selectedDateTime,dateTime,ourTaskItem;

document.addEventListener("DOMContentLoaded", () => {
    const ourTodoForm = document.querySelector(".todo-form");
    const ourTodoList = document.querySelector(".todo-list");

  
    function createNewTaskItem(newItemText) {
      ourTaskItem = document.createElement("div");
      ourTaskItem.className = "todo-item";
  
      //checkbox
      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      ourTaskItem.appendChild(checkBox);
      checkBox.setAttribute("id","checkbox_id");
      
        
      //label
      labelText = document.createElement("label");
      labelText.innerText = newItemText + " || Date & Time: "+selectedDateTime;
      ourTaskItem.appendChild(labelText);
      labelText.setAttribute("id","label_id");


      //edit_textbox
      editBox = document.createElement("input");
      editBox.type = "text";
      editBox.placeholder = "Edit here";
      ourTaskItem.appendChild(editBox);
      editBox.style.display='none';
      editBox.setAttribute("id","edit_textbox_id");

      //edit_Button
      editButton = document.createElement("button");
      editButton.className = "edit_btn";
      editButton.innerHTML = "Edit";
      ourTaskItem.appendChild(editButton);
      editButton.setAttribute("id","editButton_id");


      //DateTime-box
      dateTime = document.createElement("input");
      dateTime.type = "datetime-local";
      dateTime.setAttribute("id","datetimePicker");
      ourTaskItem.appendChild(dateTime);
      dateTime.style.display = "none";


      //save_button
      saveButton = document.createElement("button");
      saveButton.className = "save_btn";
      saveButton.innerHTML = "save";
      saveButton.style.display = "none";
      saveButton.setAttribute("id","saveButton_id");
      ourTaskItem.appendChild(saveButton);
        
      //delete-btn
      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      deleteButton.innerHTML = "X";
      ourTaskItem.appendChild(deleteButton);
      deleteButton.setAttribute("id","deleteButton_id");

  
      return ourTaskItem;
    }
  
    //add btn submit
    ourTodoForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const newTasktext = document.getElementById("new-task");
      console.log("New input text is : ", newTasktext.value);
  
      if (newTasktext.value.trim() !== "") {
        newTasktext.value = newTasktext.value
        const newlyCreatedItem = createNewTaskItem(newTasktext.value);
  
        ourTodoList.appendChild(newlyCreatedItem);
  
        newTasktext.value = "";
      }
    });


    //clicking delete btn
    ourTodoList.addEventListener("click", (event) => {
      if (event.target.matches(".delete-button")) {
        const ourItem = event.target.parentElement;
        console.log("Our parent Element ", ourItem);
  
        if (confirm("Do you want to delete it?")) {
          ourTodoList.removeChild(ourItem);
        }
      }
    });



    //clicking edit btn
    ourTodoList.addEventListener("click", (event) =>{
        if(event.target.matches(".edit_btn")){
            const lableID = event.target.parentElement.querySelector("#label_id");
            const editTextBoxID = event.target.parentElement.querySelector("#edit_textbox_id");
            const editButtonID = event.target.parentElement.querySelector("#editButton_id");
            const saveButtonID = event.target.parentElement.querySelector("#saveButton_id");
            const datetimeID = event.target.parentElement.querySelector("#datetimePicker");
            //editTask(ourItemEdit);
            //console.log("Parent elements html:::::: ",ourItemEdit);
            editTextBoxID.style.display='block';
            saveButtonID.style.display = "block";
            editButtonID.style.display='none';
            datetimeID.style.display = "block";
        }
    });



    //clicking save btn
    ourTodoList.addEventListener('click', (event) => {
        if(event.target.matches(".save_btn")){
            const lableID = event.target.parentElement.querySelector("#label_id");
            const editTextBoxID = event.target.parentElement.querySelector("#edit_textbox_id");
            const editButtonID = event.target.parentElement.querySelector("#editButton_id");
            const saveButtonID = event.target.parentElement.querySelector("#saveButton_id");
            const datetimeID = event.target.parentElement.querySelector("#datetimePicker");

            editTextBoxID.style.display='none';
            saveButtonID.style.display='none';
            editButtonID.style.display='block';
            datetimeID.style.display = "none";
            lableID.innerText = editTextBoxID.value + " || Date & Time: "+ selectedDateTime;
        }
    }); 


    //clicking Select btn
    ourTodoList.addEventListener('click', (event) => {
        if(event.target.matches(".select_btn")){
            
            var checkboxes = document.querySelectorAll('input[type="checkbox"]');
            console.log("gagagfagaga",checkboxes);
            checkboxes.forEach(function(checkbox) {
                if (checkbox.checked) {
                    
                    ourTodoList.removeChild(checkbox.parentElement);
                }
            });
        }
    });


    //date and time picker
    
    const datetimePicker = document.getElementById('datetimePicker');
    datetimePicker.addEventListener('change', function() {
        selectedDateTime = datetimePicker.value;
        console.log('Selected Date and Time:', selectedDateTime);
    });
    

    //clicking delete ALL btn
    ourTodoList.addEventListener("click", (event) => {
        if (event.target.matches(".delete_all_btn")) {
            const todoList=document.querySelector(".todo-list")
            console.log("hfjb",todoList);
          const ourItem = document.querySelectorAll(".todo-item");
          console.log(ourItem)
    
          if (confirm("Do you want to delete it?")) {
            // ourTodoList.removeChild(ourItem);
            todoList[1].removeChild(ourItem)
          }
        }
      });

    

    
  });
  