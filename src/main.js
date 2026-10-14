import { LocalStorageFactory } from './StorageFactory.js';
import { TodoRenderer } from './TodoRenderer.js';
import { TodoController } from './TodoController.js';

window.addEventListener('DOMContentLoaded', () => {
  const factory = new LocalStorageFactory();
  const todoService = factory.createService();
  const todoRenderer = new TodoRenderer('task-container');
  const todoController = new TodoController(todoService, todoRenderer);

  todoController.start();

  const input = document.getElementById('task-input');
  const addButton = document.getElementById('add-task-btn');
  const addUrgentButton = document.getElementById('add-urgent-btn');

  addButton.addEventListener('click', () => {
    if (todoController.addTask(input.value)) {
      input.value = '';
    }
  });

  addUrgentButton.addEventListener('click', () => {
    if (todoController.addUrgentTask(input.value)) {
      input.value = '';
    }
  });
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') addButton.click();
  });
});
