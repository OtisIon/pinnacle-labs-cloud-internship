// RESET DAILY
function checkNewDay() {
  let today = new Date().toDateString();
  let savedDay = localStorage.getItem("day");

  if (savedDay !== today) {
    localStorage.removeItem("tasks");
    localStorage.removeItem("goal");
    localStorage.setItem("day", today);
  }
}
checkNewDay();


// TIME
function updateTime() {
  let now = new Date();
  time.innerText = now.toLocaleTimeString();
  date.innerText = now.toDateString();
}
setInterval(updateTime, 1000);
updateTime();


// GOAL
function saveGoal() {
  let goal = goalInput.value;
  if (!goal) return;

  localStorage.setItem("goal", goal);
  goalDisplay.innerText = goal;
  goalInput.value = "";
}

function clearGoal() {
  localStorage.removeItem("goal");
  goalDisplay.innerText = "";
}

goalDisplay.innerText = localStorage.getItem("goal") || "";


// TASKS
function addTask() {
  let task = taskInput.value;
  if (!task) return;

  createTask(task, false);
  taskInput.value = "";
  saveTasks();
  updateStats();
}

function createTask(text, completed) {
  let li = document.createElement("li");
  li.innerText = text;

  if (completed) li.classList.add("completed");

  li.onclick = function () {
    li.classList.toggle("completed");
    saveTasks();
    updateStats();
  };

  li.ondblclick = function () {
    li.remove();
    saveTasks();
    updateStats();
  };

  taskList.appendChild(li);
}


// STORAGE
function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.innerText,
      done: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(t => createTask(t.text, t.done));
  updateStats();
}
loadTasks();


// STATS
function updateStats() {
  let tasks = document.querySelectorAll("#taskList li");
  let total = tasks.length;
  let done = document.querySelectorAll(".completed").length;

  stats.innerText = total === 0 ? "no tasks" : `${done}/${total} completed`;

  let percent = total === 0 ? 0 : (done / total) * 100;
  progress.style.width = percent + "%";
}
