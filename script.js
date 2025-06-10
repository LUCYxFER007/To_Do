 let tasks = [];

        const addTask = () => {
            const taskInput = document.getElementById('Taskinput');
            const text = taskInput.value.trim();
            
            if (text) {
                tasks.push({
                    text: text,
                    completed: false,
                    id: Date.now() // Simple unique ID
                });
                taskInput.value = '';
                updateTaskList();
                updateProgress();
            }
        };

        const updateTaskList = () => {
            const tasklist = document.getElementById('tasklist');
            tasklist.innerHTML = '';

            if (tasks.length === 0) {
                tasklist.innerHTML = '<div class="empty-state">No tasks yet. Add one above!</div>';
                return;
            }

            tasks.forEach((task, index) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <div class="taskItem">
                        <div class="task ${task.completed ? 'completed' : ''}" >
                            <div class="checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTaskComplete(${index})"></div>
                            <p>${task.text}</p>
                        </div>
                        <div class="icons">
                            <svg class="icon edit-icon" onclick="editTask(${index})" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                            </svg>
                            <svg class="icon delete-icon" onclick="deleteTask(${index})" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                        </div>
                    </div>
                `;
                tasklist.appendChild(listItem);
            });
        };

        const toggleTaskComplete = (index) => {
            tasks[index].completed = !tasks[index].completed;
            updateTaskList();
            updateProgress();
        };

        const editTask = (index) => {
            const newText = prompt('Edit task:', tasks[index].text);
            if (newText !== null && newText.trim() !== '') {
                tasks[index].text = newText.trim();
                updateTaskList();
            }
        };

        const deleteTask = (index) => {
            if (confirm('Are you sure you want to delete this task?')) {
                tasks.splice(index, 1);
                updateTaskList();
                updateProgress();
            }
        };

        const updateProgress = () => {
            const totalTasks = tasks.length;
            const completedTasks = tasks.filter(task => task.completed).length;
            
            // Update numbers
            document.getElementById('numbers').textContent = `${completedTasks}/${totalTasks}`;
            
            // Update progress bar
            const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
            document.getElementById('progress').style.width = `${progressPercentage}%`;
        };

        // Event listeners
        document.getElementById('newtask').addEventListener('click', function(e) {
            e.preventDefault();
            addTask();
        });

        document.getElementById('Taskinput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addTask();
            }
        });

        // Initialize
        updateProgress();