// ===== To-Do App - ES6+ JavaScript =====

class TodoApp {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.editingTaskId = null;
        
        this.initializeElements();
        this.attachEventListeners();
        this.render();
    }

    // ===== Initialize DOM Elements =====
    initializeElements() {
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');
        this.taskCount = document.getElementById('taskCount');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.filterButtons = document.querySelectorAll('.btn-filter');
    }

    // ===== Attach Event Listeners =====
    attachEventListeners() {
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Event delegation for task actions
        this.taskList.addEventListener('click', (e) => this.handleTaskAction(e));
        this.taskList.addEventListener('dblclick', (e) => this.handleTaskEdit(e));
    }

    // ===== Generate Unique ID =====
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // ===== Add New Task =====
    addTask() {
        const taskText = this.taskInput.value.trim();
        
        if (!taskText) {
            this.showError('Please enter a task');
            return;
        }

        const newTask = {
            id: this.generateId(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(newTask);
        this.saveTasks();
        this.taskInput.value = '';
        this.render();
    }

    // ===== Toggle Task Completion =====
    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    // ===== Delete Task =====
    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveTasks();
        this.render();
    }

    // ===== Edit Task =====
    handleTaskEdit(e) {
        const taskItem = e.target.closest('.task-item');
        if (!taskItem) return;

        const taskId = taskItem.dataset.taskId;
        const taskTextElement = taskItem.querySelector('.task-text');
        
        this.editingTaskId = taskId;
        taskTextElement.contentEditable = true;
        taskTextElement.focus();
        
        // Select all text
        const range = document.createRange();
        range.selectNodeContents(taskTextElement);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        // Save on blur or Enter key
        const saveEdit = () => {
            const newText = taskTextElement.textContent.trim();
            if (newText) {
                const task = this.tasks.find(t => t.id === taskId);
                if (task) {
                    task.text = newText;
                    this.saveTasks();
                }
            } else {
                this.render(); // Revert if empty
            }
            taskTextElement.contentEditable = false;
            this.editingTaskId = null;
        };

        taskTextElement.addEventListener('blur', saveEdit, { once: true });
        taskTextElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                taskTextElement.blur();
            }
        }, { once: true });
    }

    // ===== Handle Task Actions =====
    handleTaskAction(e) {
        const taskItem = e.target.closest('.task-item');
        if (!taskItem) return;

        const taskId = taskItem.dataset.taskId;

        if (e.target.closest('.task-checkbox')) {
            this.toggleTask(taskId);
        } else if (e.target.closest('.btn-delete')) {
            this.deleteTask(taskId);
        } else if (e.target.closest('.btn-edit')) {
            this.handleTaskEdit(e);
        }
    }

    // ===== Set Filter =====
    setFilter(filter) {
        this.currentFilter = filter;
        
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.render();
    }

    // ===== Get Filtered Tasks =====
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    // ===== Clear Completed Tasks =====
    clearCompleted() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            this.showError('No completed tasks to clear');
            return;
        }

        this.tasks = this.tasks.filter(t => !t.completed);
        this.saveTasks();
        this.render();
    }

    // ===== Show Error Message =====
    showError(message) {
        const existingToast = document.querySelector('.error-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(248, 49, 47, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            backdrop-filter: blur(10px);
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    // ===== Render Tasks =====
    render() {
        const filteredTasks = this.getFilteredTasks();
        
        this.taskList.innerHTML = '';
        
        filteredTasks.forEach(task => {
            const taskItem = this.createTaskElement(task);
            this.taskList.appendChild(taskItem);
        });

        // Update empty state visibility
        this.emptyState.classList.toggle('show', filteredTasks.length === 0);

        // Update task count
        const activeTasks = this.tasks.filter(t => !t.completed).length;
        const completedTasks = this.tasks.filter(t => t.completed).length;
        this.taskCount.textContent = `${activeTasks} active, ${completedTasks} completed`;
    }

    // ===== Create Task Element =====
    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.taskId = task.id;

        li.innerHTML = `
            <div class="task-checkbox ${task.completed ? 'checked' : ''}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <span class="task-text">${this.escapeHtml(task.text)}</span>
            <div class="task-actions">
                <button class="btn-action btn-edit" title="Edit task">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button class="btn-action btn-delete" title="Delete task">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `;

        return li;
    }

    // ===== Escape HTML to prevent XSS =====
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ===== Save Tasks to Local Storage =====
    saveTasks() {
        try {
            localStorage.setItem('apturaTodoTasks', JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }

    // ===== Load Tasks from Local Storage =====
    loadTasks() {
        try {
            const saved = localStorage.getItem('apturaTodoTasks');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            return [];
        }
    }
}

// ===== Initialize App when DOM is ready =====
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});

// ===== Add CSS animations for toasts =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
