import { useState, ChangeEvent, KeyboardEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import "./style.css";

interface Task {
  id: string;
  title: string;
}

function App() {
  const [checkedTasks, setCheckedTasks] = useState<string[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: uuidv4(),
      title: "Создать ToDo-Лист",
    },
  ]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  // Функция для обработки ввода тектса
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  };

  // Функция для добавления новой задачи
  const handleAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && newTaskTitle.trim() !== "") {
      const newTask: Task = {
        id: uuidv4(),
        title: newTaskTitle,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    }
  };

  // Функция для обработки клика по чекбоксу
  const handleCheckboxClick = (taskId: string) => {
    if (checkedTasks.includes(taskId)) {
      setCheckedTasks(checkedTasks.filter((id) => id !== taskId));
    } else {
      setCheckedTasks([...checkedTasks, taskId]);
    }
  };

  // Функция для удаления завершенных задач
  const handleClearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !checkedTasks.includes(task.id));
    setTasks(updatedTasks);
    setCheckedTasks([]);
  };

  // Функция для подсчета оставшихся невыполненных задач
  const countRemainingTasks = () => {
    return tasks.filter((task) => !checkedTasks.includes(task.id)).length;
  };

  // Функция для фильтрации задач по состоянию (All, Active, Completed)
  const filterTasks = () => {
    if (selectedFilter === "Active") {
      return tasks.filter((task) => !checkedTasks.includes(task.id));
    } else if (selectedFilter === "Completed") {
      return tasks.filter((task) => checkedTasks.includes(task.id));
    } else {
      return tasks;
    }
  };

  function add(a, b) {
    return a + b;
  }

  return (
    <div className="App">
      <h1 id="Todos">todos</h1>
      <div className="todo">
        <input
          type="text"
          className="todo__btn"
          placeholder="What needs to be done?"
          value={newTaskTitle}
          onChange={handleInputChange}
          onKeyPress={handleAddTask}
        />
        <div className="tasks__container">
          {filterTasks().map((task) => (
            <div
              key={task.id}
              className={`todo__item ${checkedTasks.includes(task.id) ? "checked" : ""}`}
              onClick={() => handleCheckboxClick(task.id)}
            >
              <input
                type="checkbox"
                name=""
                className="todo__inp"
                checked={checkedTasks.includes(task.id)}
                onChange={() => {}}
              />
              <h1
                id="task__title"
                className={checkedTasks.includes(task.id) ? "checked" : ""}
              >
                {task.title}
              </h1>
            </div>
          ))}
          <section className="todo__footer">
            <div className="todo__items__left">{countRemainingTasks()} items left</div>
            <div className="todo__filters">
              <button
                className={`filter__btn ${selectedFilter === "All" ? "selected" : ""}`}
                onClick={() => setSelectedFilter("All")}
              >
                All
              </button>
              <button
                className={`filter__btn ${selectedFilter === "Active" ? "selected" : ""}`}
                onClick={() => setSelectedFilter("Active")}
              >
                Active
              </button>
              <button
                className={`filter__btn ${selectedFilter === "Completed" ? "selected" : ""}`}
                onClick={() => setSelectedFilter("Completed")}
              >
                Completed
              </button>
            </div>
            <div className="todo__clear">
              <button className="todo__clear__btn" onClick={handleClearCompleted}>Clear completed</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
