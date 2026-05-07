
let currentDate = new Date();
let selectedDate = new Date().toISOString().split("T")[0];


window.onload = function() {
    renderCalendar();
    renderTasks();
    
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
        document.getElementById("themeToggle").innerText = " ☀️ ";
    }
};


function renderCalendar() {
    const calendarDays = document.getElementById("calendarDays");
    const monthYear = document.getElementById("monthYear");
    calendarDays.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    monthYear.textContent = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

    for (let i = 0; i < firstDay; i++) {
        calendarDays.innerHTML += "<div></div>";
    }

    for (let day = 1; day <= totalDays; day++) {
        const fullDate = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        const div = document.createElement("div");
        div.classList.add("day");
        if (fullDate === selectedDate) div.classList.add("selected");
        div.textContent = day;
        
        div.onclick = () => {
            selectedDate = fullDate;
            renderCalendar();
            renderTasks(); 
        };
        calendarDays.appendChild(div);
    }
    document.getElementById("selectedDateText").textContent = "Tasks for " + selectedDate;
}

function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    renderCalendar();
}


function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    /
    savedTasks.filter(t => t.date === selectedDate).forEach(t => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.innerText = t.text;
        if (t.completed) span.classList.add("done");

      
        span.onclick = function() {
            span.classList.toggle("done");
            updateStorage();
        };

        
        let delBtn = document.createElement("button");
        delBtn.innerHTML = " ✕ ";
        delBtn.onclick = function(e) {
            e.stopPropagation();
            li.remove();
            updateStorage();
        };

        li.appendChild(span);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function addTask() {
    let input = document.getElementById("taskInput");
    if (input.value.trim() !== "") {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({
            text: input.value,
            completed: false,
            date: selectedDate
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        input.value = "";
        renderTasks();
    }
}


function updateStorage() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    let currentTasksOnScreen = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        let span = li.querySelector("span");
        currentTasksOnScreen.push({
            text: span.innerText,
            completed: span.classList.contains("done"),
            date: selectedDate
        });
    });

    
    let otherDatesTasks = tasks.filter(t => t.date !== selectedDate);
    let finalTasks = [...otherDatesTasks, ...currentTasksOnScreen];
    localStorage.setItem("tasks", JSON.stringify(finalTasks));
}


function toggleTheme() {
    document.body.classList.toggle("light");
    let theme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", theme);
    document.getElementById("themeToggle").innerText = theme === "light" ? " ☀️ " : " 🌙 ";
          }
          
