document.addEventListener("DOMContentLoaded", function () {
    const todoForm = document.getElementById("todo-form");
    const todoNameInput = document.getElementById("todo-name");
    const todoDescriptionInput = document.getElementById("todo-description");
    const todoList = document.getElementById("todo-list");
    const todoDoneList = document.getElementById("todo-done-list");
  
    todoForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const todoName = todoNameInput.value.trim();
      const todoDescription = todoDescriptionInput.value.trim();
      if (todoName === "" || todoDescription === "") {
        alert("Please enter both todo name and description.");
        return;
      }
      
      const todoData = {
        name: todoName,
        description: todoDescription
      };
  
      // Make a POST request to save todo item
      axios.post('https://crudcrud.com/api/your-api-key/todos', todoData)
        .then(function (response) {
          console.log('Todo item saved successfully:', response.data);
  
          // Add todo item to the list
          const todoItem = createTodoItem(response.data);
          todoList.appendChild(todoItem);
  
          // Clear input fields
          todoNameInput.value = "";
          todoDescriptionInput.value = "";
        })
        .catch(function (error) {
          console.error('Error saving todo item:', error);
        });
    });
  
    function createTodoItem(todoData) {
      const todoItem = document.createElement("li");
      todoItem.textContent = `${todoData.name} - ${todoData.description}`;
      return todoItem;
    }
  });
  
