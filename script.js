// Daily Routine PRO - COMPLETELY FIXED VERSION
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Daily Routine PRO - Initializing...');
    
    // ========== GLOBAL STATE ==========
    const appState = {
        tasks: [],
        currentFilter: 'all',
        currentSort: 'priority',
        achievements: [],
        soundEnabled: true,
        focusScore: 0,
        focusMode: false
    };
    
    // ========== ELEMENTS CACHE ==========
    const elements = {};
    
    // ========== INITIALIZATION ==========
    function initializeApp() {
        console.log('📦 Initializing application...');

        initCPPMainButton();
        
        // Cache all DOM elements
        cacheElements();
        
        // Load saved theme
        loadSavedTheme();
        
        // Set up time
        setCurrentDate();
        updateClock();
        setInterval(updateClock, 60000);
        
        // Load saved data
        loadData();
        
        // Setup all event listeners
        setupEventListeners();
        
        // Initialize UI
        initAnimations();
        updateStats();
        renderTasks();
        
        // Welcome
        setTimeout(() => {
            showNotification('🚀 Daily Routine PRO Ready!');
        }, 500);
        
        console.log('✅ Application initialized successfully!');
    }
    
    // ========== ELEMENT CACHING ==========
    function cacheElements() {
        console.log('🔍 Caching DOM elements...');
        
        // Theme & Controls
        elements.themeToggle = document.getElementById('theme-toggle');
        elements.soundToggle = document.getElementById('sound-toggle');
        
        // Task Form
        elements.taskForm = document.getElementById('task-form');
        elements.taskDescription = document.getElementById('task-description');
        elements.taskTime = document.getElementById('task-time');
        elements.taskPriority = document.getElementById('task-priority');
        elements.taskCategory = document.getElementById('task-category');
        
        // Priority & Category
        elements.priorityOptions = document.querySelectorAll('.priority-option');
        elements.categoryChips = document.querySelectorAll('.category-chip');
        
        // Task List Controls
        elements.taskList = document.getElementById('task-list');
        elements.filterTabs = document.querySelectorAll('.filter-tab');
        elements.sortSelect = document.getElementById('sort-tasks');
        
        // Control Buttons
        elements.saveBtn = document.getElementById('save-btn');
        elements.loadBtn = document.getElementById('load-btn');
        elements.exportBtn = document.getElementById('export-btn');
        elements.clearBtn = document.getElementById('clear-btn');
        elements.celebrateBtn = document.getElementById('celebrate-btn');
        elements.fabHelp = document.getElementById('fab-help');
        elements.suggestTasksBtn = document.getElementById('suggest-tasks');
        
        // Quick Action Buttons
        elements.quickMorningBtn = document.getElementById('quick-morning');
        elements.quickWorkoutBtn = document.getElementById('quick-workout');
        elements.quickStudyBtn = document.getElementById('quick-study');
        
        // Achievement Toast
        elements.achievementToast = document.getElementById('achievement-toast');
        elements.confettiContainer = document.querySelector('.confetti-container');
        
        // Stats Elements
        elements.totalTasks = document.getElementById('total-tasks');
        elements.completedTasks = document.getElementById('completed-tasks');
        elements.pendingTasks = document.getElementById('pending-tasks');
        elements.productivity = document.getElementById('productivity');
        elements.todayGoal = document.getElementById('today-goal');
        elements.focusScoreEl = document.getElementById('focus-score');
        elements.timeLeft = document.getElementById('time-left');
        elements.currentDate = document.getElementById('current-date');
        
        // Count Elements
        elements.countAll = document.getElementById('count-all');
        elements.countPending = document.getElementById('count-pending');
        elements.countCompleted = document.getElementById('count-completed');
        
        // Audio Elements
        elements.sounds = {
            click: document.getElementById('sound-click'),
            complete: document.getElementById('sound-complete'),
            notification: document.getElementById('sound-notification')
        };
        
        console.log('✅ Elements cached successfully');
    }
    
    // ========== EVENT LISTENERS SETUP ==========
    function setupEventListeners() {
        console.log('🔗 Setting up event listeners...');
        
        // Theme Toggle
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('change', handleThemeToggle);
            console.log('✅ Theme toggle listener added');
        }
        
        // Sound Toggle
        if (elements.soundToggle) {
            elements.soundToggle.addEventListener('click', handleSoundToggle);
        }
        
        // Task Form
        if (elements.taskForm) {
            elements.taskForm.addEventListener('submit', handleTaskSubmit);
        }
        
        // Priority Selection
        if (elements.priorityOptions.length > 0) {
            elements.priorityOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const priority = option.dataset.priority;
                    selectPriority(priority);
                    playSound('click');
                });
            });
        }
        
        // Category Selection
        if (elements.categoryChips.length > 0) {
            elements.categoryChips.forEach(chip => {
                chip.addEventListener('click', () => {
                    const category = chip.dataset.category;
                    selectCategory(category);
                    playSound('click');
                });
            });
        }
        
        // Filter Tabs
        if (elements.filterTabs.length > 0) {
            elements.filterTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const filter = tab.dataset.filter;
                    setFilter(filter);
                    playSound('click');
                });
            });
        }
        
        // Sort Select
        if (elements.sortSelect) {
            elements.sortSelect.addEventListener('change', (e) => {
                appState.currentSort = e.target.value;
                renderTasks();
                playSound('click');
            });
        }
        
        // Control Buttons
        if (elements.saveBtn) elements.saveBtn.addEventListener('click', saveData);
        if (elements.loadBtn) elements.loadBtn.addEventListener('click', loadFromFile);
        if (elements.exportBtn) elements.exportBtn.addEventListener('click', exportData);
        if (elements.clearBtn) elements.clearBtn.addEventListener('click', clearAllTasks);
        if (elements.celebrateBtn) elements.celebrateBtn.addEventListener('click', triggerCelebration);
        if (elements.fabHelp) elements.fabHelp.addEventListener('click', showHelp);
        if (elements.suggestTasksBtn) elements.suggestTasksBtn.addEventListener('click', suggestTasks);
        
        // Quick Action Buttons - FIXED
        if (elements.quickMorningBtn) {
            elements.quickMorningBtn.addEventListener('click', () => {
                console.log('🌅 Morning routine clicked');
                addQuickTasks('morning');
            });
        }
        
        if (elements.quickWorkoutBtn) {
            elements.quickWorkoutBtn.addEventListener('click', () => {
                console.log('💪 Workout plan clicked');
                addQuickTasks('workout');
            });
        }
        
        if (elements.quickStudyBtn) {
            elements.quickStudyBtn.addEventListener('click', () => {
                console.log('📚 Study session clicked');
                addQuickTasks('study');
            });
        }
        
        // Achievement Toast Close
        if (elements.achievementToast) {
            const closeBtn = elements.achievementToast.querySelector('.achievement-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    elements.achievementToast.classList.remove('show');
                });
            }
        }
        
        // Focus Mode
        if (elements.taskList) {
            elements.taskList.addEventListener('dblclick', toggleFocusMode);
        }
        
        console.log('✅ All event listeners setup complete');
    }
    
    // ========== THEME FUNCTIONS ==========
    function loadSavedTheme() {
        console.log('🌓 Loading saved theme...');
        const savedTheme = localStorage.getItem('theme') || 'light';
        const isDark = savedTheme === 'dark';
        
        if (isDark) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
            if (elements.themeToggle) elements.themeToggle.checked = true;
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
            if (elements.themeToggle) elements.themeToggle.checked = false;
        }
        
        console.log(`✅ Theme loaded: ${savedTheme}`);
    }
    
    function handleThemeToggle() {
        const isDark = elements.themeToggle.checked;
        console.log(`🔄 Toggling theme to: ${isDark ? 'dark' : 'light'}`);
        
        if (isDark) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            showNotification('🌙 Dark Mode Activated');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            showNotification('☀️ Light Mode Activated');
        }
        
        playSound('click');
    }
    
    // ========== TASK MANAGEMENT ==========
    function handleTaskSubmit(e) {
        e.preventDefault();
        console.log('📝 Handling task submission...');
        
        const description = elements.taskDescription?.value.trim() || '';
        const time = elements.taskTime?.value || getCurrentTime();
        const priority = parseInt(elements.taskPriority?.value || '1');
        const category = elements.taskCategory?.value || 'personal';
        
        if (!description) {
            showNotification('❌ Please enter a task description!', 'error');
            return;
        }
        
        const task = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            description,
            time,
            priority,
            category,
            completed: false,
            createdAt: new Date().toISOString(),
            focusPoints: priority === 1 ? 3 : priority === 2 ? 2 : 1
        };
        
        addTask(task);
        
        // Reset form
        if (elements.taskForm) {
            elements.taskForm.reset();
            elements.taskTime.value = getCurrentTime();
            selectPriority('1');
            selectCategory('personal');
        }
        
        showNotification('✅ Task added successfully!');
        playSound('click');
    }
    
    function addTask(task) {
        console.log(`➕ Adding task: ${task.description}`);
        appState.tasks.unshift(task);
        saveData();
        updateStats();
        renderTasks();
        checkAchievements();
        
        appState.focusScore += 2;
        updateFocusScore();
    }
    
    // ========== TASK ACTIONS ==========
    function setupTaskActionListeners() {
        // This will be called after rendering tasks
        console.log('🎯 Setting up task action listeners...');
        
        // Mark as complete/incomplete
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', function() {
                const taskId = this.closest('.task-item').dataset.id;
                toggleTaskCompletion(taskId);
            });
        });
        
        // Edit task
        document.querySelectorAll('.task-action-btn:not(.delete)').forEach(btn => {
            btn.addEventListener('click', function() {
                const taskId = this.closest('.task-item').dataset.id;
                editTask(taskId);
            });
        });
        
        // Delete task
        document.querySelectorAll('.task-action-btn.delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const taskId = this.closest('.task-item').dataset.id;
                deleteTask(taskId);
            });
        });
    }
    
    function toggleTaskCompletion(taskId) {
        console.log(`✅ Toggling completion for task: ${taskId}`);
        const task = appState.tasks.find(t => t.id === taskId);
        
        if (task) {
            task.completed = !task.completed;
            
            if (task.completed) {
                appState.focusScore += task.focusPoints;
                playSound('complete');
                showNotification('🎉 Task completed!');
                
                // Check achievements
                const completedCount = appState.tasks.filter(t => t.completed).length;
                if (completedCount % 5 === 0) {
                    unlockAchievement(`🏆 Completed ${completedCount} tasks`);
                }
            } else {
                appState.focusScore -= task.focusPoints;
                showNotification('🔄 Task marked as pending');
            }
            
            saveData();
            updateStats();
            renderTasks();
            updateFocusScore();
        }
    }
    
    function editTask(taskId) {
        console.log(`✏️ Editing task: ${taskId}`);
        const task = appState.tasks.find(t => t.id === taskId);
        
        if (task) {
            // Fill form with task data
            elements.taskDescription.value = task.description;
            elements.taskTime.value = task.time;
            selectPriority(task.priority.toString());
            selectCategory(task.category);
            
            // Remove original task
            appState.tasks = appState.tasks.filter(t => t.id !== taskId);
            
            showNotification('📝 Task loaded for editing');
            updateStats();
            renderTasks();
            saveData();
        }
    }
    
    function deleteTask(taskId) {
        console.log(`🗑️ Deleting task: ${taskId}`);
        
        if (confirm('Are you sure you want to delete this task?')) {
            appState.tasks = appState.tasks.filter(t => t.id !== taskId);
            saveData();
            updateStats();
            renderTasks();
            showNotification('🗑️ Task deleted');
        }
    }
    
    // ========== QUICK TASKS ==========
    function addQuickTasks(type) {
        console.log(`⚡ Adding quick tasks: ${type}`);
        
        const templates = {
            morning: [
                { description: '🌅 Wake up and make bed', time: '06:30', priority: 2, category: 'personal' },
                { description: '💧 Drink a glass of water', time: '06:35', priority: 1, category: 'health' },
                { description: '🧘 Morning meditation (10 min)', time: '06:45', priority: 2, category: 'health' },
                { description: '🏋️‍♂️ Quick morning stretches', time: '07:00', priority: 2, category: 'health' },
                { description: '🍳 Healthy breakfast', time: '07:30', priority: 1, category: 'health' },
                { description: '📝 Plan your day', time: '08:00', priority: 1, category: 'work' }
            ],
            workout: [
                { description: '🔥 5-minute warmup', time: '18:00', priority: 2, category: 'health' },
                { description: '🏃‍♂️ Cardio - Running (20 min)', time: '18:10', priority: 1, category: 'health' },
                { description: '💪 Push-ups (3 sets)', time: '18:30', priority: 1, category: 'health' },
                { description: '🏋️‍♀️ Squats (3 sets)', time: '18:40', priority: 1, category: 'health' },
                { description: '🧘 Cool down stretches', time: '19:00', priority: 2, category: 'health' },
                { description: '💦 Drink protein shake', time: '19:10', priority: 2, category: 'health' }
            ],
            study: [
                { description: '📚 Review previous notes', time: '15:00', priority: 2, category: 'study' },
                { description: '🧠 Learn new concepts', time: '15:30', priority: 1, category: 'study' },
                { description: '✍️ Practice exercises', time: '16:30', priority: 1, category: 'study' },
                { description: '☕ Take short break', time: '17:30', priority: 3, category: 'personal' },
                { description: '📝 Make summary notes', time: '17:45', priority: 2, category: 'study' },
                { description: '🔍 Review what you learned', time: '18:15', priority: 2, category: 'study' }
            ]
        };
        
        const tasks = templates[type] || [];
        let addedCount = 0;
        
        tasks.forEach((task, index) => {
            setTimeout(() => {
                addTask({
                    ...task,
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                    completed: false,
                    createdAt: new Date().toISOString(),
                    focusPoints: task.priority === 1 ? 3 : task.priority === 2 ? 2 : 1
                });
                addedCount++;
                
                if (addedCount === tasks.length) {
                    showNotification(`✅ Added ${tasks.length} ${type} tasks!`);
                }
            }, index * 300);
        });
    }
    
    // ========== UI RENDERING ==========
    function renderTasks() {
        if (!elements.taskList) return;
        
        console.log('🎨 Rendering tasks...');
        elements.taskList.innerHTML = '';
        
        // Filter tasks
        let filteredTasks = [...appState.tasks];
        if (appState.currentFilter === 'pending') {
            filteredTasks = appState.tasks.filter(task => !task.completed);
        } else if (appState.currentFilter === 'completed') {
            filteredTasks = appState.tasks.filter(task => task.completed);
        }
        
        // Sort tasks
        filteredTasks.sort((a, b) => {
            switch (appState.currentSort) {
                case 'time': return a.time.localeCompare(b.time);
                case 'category': return a.category.localeCompare(b.category);
                default: // priority
                    if (a.priority !== b.priority) return a.priority - b.priority;
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });
        
        // Update counts
        if (elements.countAll) elements.countAll.textContent = appState.tasks.length;
        if (elements.countPending) elements.countPending.textContent = appState.tasks.filter(t => !t.completed).length;
        if (elements.countCompleted) elements.countCompleted.textContent = appState.tasks.filter(t => t.completed).length;
        
        // Render or show empty state
        if (filteredTasks.length === 0) {
            showEmptyState();
            return;
        }
        
        // Render tasks
        filteredTasks.forEach((task, index) => {
            const taskElement = createTaskElement(task, index);
            elements.taskList.appendChild(taskElement);
            
            // Staggered animation
            setTimeout(() => {
                taskElement.style.opacity = '1';
                taskElement.style.transform = 'translateY(0)';
            }, index * 50);
        });
        
        // Setup listeners for newly created tasks
        setTimeout(setupTaskActionListeners, 100);
    }
    
    function createTaskElement(task, index) {
        const div = document.createElement('div');
        div.className = `task-item ${task.completed ? 'completed' : ''}`;
        div.dataset.id = task.id;
        div.style.opacity = '0';
        div.style.transform = 'translateY(20px)';
        div.style.transition = `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`;
        
        const priorityClass = getPriorityClass(task.priority);
        const priorityText = getPriorityText(task.priority);
        const timeDisplay = formatTime(task.time);
        const categoryEmoji = getCategoryEmoji(task.category);
        
        div.innerHTML = `
            <div class="task-checkbox ${task.completed ? 'checked' : ''}">
                ${task.completed ? '<i class="fas fa-check"></i>' : ''}
            </div>
            <div class="task-content">
                <div class="task-header">
                    <div class="task-description ${task.completed ? 'completed' : ''}">
                        ${task.description}
                    </div>
                    <div class="task-category">
                        ${categoryEmoji} ${task.category}
                    </div>
                </div>
                <div class="task-footer">
                    <div class="task-meta">
                        <span class="task-time">
                            <i class="far fa-clock"></i> ${timeDisplay}
                        </span>
                        <span class="priority-indicator ${priorityClass}">
                            ${priorityText}
                        </span>
                    </div>
                    <div class="task-actions">
                        <button class="task-action-btn edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="task-action-btn delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        return div;
    }
    
    function showEmptyState() {
        const emptyHTML = `
            <div class="empty-state">
                <div class="empty-illustration">
                    <i class="fas fa-clipboard-list"></i>
                    <div class="empty-glow"></div>
                </div>
                <h3 class="empty-title">No Tasks Yet</h3>
                <p class="empty-text">${appState.currentFilter === 'all' ? 
                    'Add your first task to get started!' : 
                    appState.currentFilter === 'pending' ? 
                    'All tasks are completed! 🎉' : 
                    'Complete some tasks to see them here!'}</p>
                ${appState.currentFilter === 'all' ? `
                    <div class="empty-actions">
                        <button class="btn-empty" id="empty-suggest-tasks">
                            <i class="fas fa-lightbulb"></i> Suggest Tasks
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
        elements.taskList.innerHTML = emptyHTML;
        
        // Add listener for suggest tasks in empty state
        const emptySuggestBtn = document.getElementById('empty-suggest-tasks');
        if (emptySuggestBtn) {
            emptySuggestBtn.addEventListener('click', suggestTasks);
        }
    }
    
    // ========== SUGGESTED TASKS ==========
    function suggestTasks() {
        console.log('💡 Suggesting tasks...');
        const suggestions = [
            { description: '🧘 Morning meditation and journaling', time: '07:00', priority: 1, category: 'personal' },
            { description: '📝 Plan day and prioritize tasks', time: '08:00', priority: 1, category: 'work' },
            { description: '🏃‍♂️ 30-minute workout session', time: '09:00', priority: 2, category: 'health' },
            { description: '🛒 Grocery shopping', time: '17:00', priority: 3, category: 'shopping' },
            { description: '📚 Learn something new', time: '19:00', priority: 3, category: 'study' },
            { description: '📊 Review day and plan tomorrow', time: '21:00', priority: 2, category: 'personal' }
        ];
        
        suggestions.forEach((task, index) => {
            setTimeout(() => {
                addTask({
                    ...task,
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                    completed: false,
                    createdAt: new Date().toISOString(),
                    focusPoints: task.priority === 1 ? 3 : task.priority === 2 ? 2 : 1
                });
            }, index * 300);
        });
        
        showNotification('💡 Added suggested tasks!');
    }
    
    // ========== UI CONTROLS ==========
    function selectPriority(priority) {
        elements.priorityOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.priority === priority);
        });
        elements.taskPriority.value = priority;
    }
    
    function selectCategory(category) {
        elements.categoryChips.forEach(chip => {
            chip.classList.toggle('active', chip.dataset.category === category);
        });
        elements.taskCategory.value = category;
    }
    
    function setFilter(filter) {
        appState.currentFilter = filter;
        elements.filterTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.filter === filter);
        });
        renderTasks();
    }
    
    // ========== DATA MANAGEMENT ==========
    function saveData() {
        console.log('💾 Saving data...');
        const data = {
            tasks: appState.tasks,
            achievements: appState.achievements,
            focusScore: appState.focusScore,
            theme: document.body.classList.contains('dark-theme') ? 'dark' : 'light'
        };
        
        localStorage.setItem('dailyRoutinePro', JSON.stringify(data));
        showNotification('💾 Data saved successfully!');
    }
    
    function loadData() {
        console.log('📂 Loading data...');
        const saved = localStorage.getItem('dailyRoutinePro');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                appState.tasks = data.tasks || [];
                appState.achievements = data.achievements || [];
                appState.focusScore = data.focusScore || 0;
                
                // Apply saved theme
                if (data.theme === 'dark') {
                    document.body.classList.add('dark-theme');
                    document.body.classList.remove('light-theme');
                    if (elements.themeToggle) elements.themeToggle.checked = true;
                }
                
                console.log(`✅ Loaded ${appState.tasks.length} tasks`);
            } catch (e) {
                console.error('❌ Error loading data:', e);
            }
        }
    }
    
    function loadFromFile() {
        console.log('📁 Loading from file...');
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = e => {
                try {
                    const data = JSON.parse(e.target.result);
                    appState.tasks = data.tasks || [];
                    updateStats();
                    renderTasks();
                    showNotification('📂 Data loaded from file!');
                } catch (error) {
                    showNotification('❌ Error loading file. Invalid format.', 'error');
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    }
    
    function exportData() {
        console.log('📤 Exporting data...');
        const data = {
            tasks: appState.tasks,
            stats: {
                total: appState.tasks.length,
                completed: appState.tasks.filter(t => t.completed).length,
                pending: appState.tasks.filter(t => !t.completed).length,
                productivity: appState.tasks.length > 0 ? 
                    Math.round((appState.tasks.filter(t => t.completed).length / appState.tasks.length) * 100) : 0
            },
            exportedAt: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `daily-routine-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('📤 Data exported!');
    }
    
    function clearAllTasks() {
        console.log('🧹 Clearing all tasks...');
        if (appState.tasks.length === 0) {
            showNotification('ℹ️ No tasks to clear!', 'info');
            return;
        }
        
        if (confirm('⚠️ Are you sure you want to delete ALL tasks? This cannot be undone!')) {
            appState.tasks = [];
            saveData();
            updateStats();
            renderTasks();
            showNotification('🧹 All tasks cleared!');
        }
    }
    
    // ========== STATS & UPDATES ==========
    function updateStats() {
        const total = appState.tasks.length;
        const completed = appState.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const productivity = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        // Update counters with animation
        if (elements.totalTasks) animateNumber(elements.totalTasks, total);
        if (elements.completedTasks) animateNumber(elements.completedTasks, completed);
        if (elements.pendingTasks) animateNumber(elements.pendingTasks, pending);
        if (elements.productivity) elements.productivity.textContent = `${productivity}%`;
        
        // Update today's goal
        const goal = Math.min(100, Math.round((completed / 10) * 100));
        if (elements.todayGoal) elements.todayGoal.textContent = `${goal}%`;
        
        updateFocusScore();
    }
    
    function animateNumber(element, target) {
        const current = parseInt(element.textContent) || 0;
        const increment = target > current ? 1 : -1;
        const steps = Math.abs(target - current);
        
        if (steps === 0) {
            element.textContent = target;
            return;
        }
        
        let step = 0;
        const timer = setInterval(() => {
            element.textContent = parseInt(element.textContent) + increment;
            step++;
            
            if (step >= steps) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    }
    
    function updateFocusScore() {
        appState.focusScore = Math.max(0, Math.min(100, appState.focusScore));
        if (elements.focusScoreEl) {
            elements.focusScoreEl.textContent = appState.focusScore;
        }
    }
    
    // ========== HELPER FUNCTIONS ==========
    function handleSoundToggle() {
        appState.soundEnabled = !appState.soundEnabled;
        const icon = elements.soundToggle.querySelector('i');
        const wave = elements.soundToggle.querySelector('.sound-wave');
        
        if (appState.soundEnabled) {
            icon.className = 'fas fa-volume-up';
            wave.style.opacity = '1';
            showNotification('🔊 Sound enabled');
        } else {
            icon.className = 'fas fa-volume-mute';
            wave.style.opacity = '0.3';
            showNotification('🔇 Sound muted');
        }
    }
    
    function playSound(type) {
        if (!appState.soundEnabled || !elements.sounds[type]) return;
        
        try {
            elements.sounds[type].currentTime = 0;
            elements.sounds[type].play();
        } catch (e) {
            console.log('Audio play failed:', e);
        }
    }
    
    function setCurrentDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        if (elements.currentDate) {
            elements.currentDate.textContent = now.toLocaleDateString('en-US', options);
        }
    }
    
    function updateClock() {
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        
        const timeLeft = endOfDay - now;
        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        if (elements.timeLeft) {
            elements.timeLeft.textContent = `${hoursLeft}h ${minutesLeft}m`;
        }
    }
    
    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    function getPriorityClass(priority) {
        switch(priority) {
            case 1: return 'priority-urgent';
            case 2: return 'priority-normal';
            case 3: return 'priority-low';
            default: return '';
        }
    }
    
    function getPriorityText(priority) {
        switch(priority) {
            case 1: return 'URGENT';
            case 2: return 'NORMAL';
            case 3: return 'LOW';
            default: return '';
        }
    }
    
    function getCategoryEmoji(category) {
        const emojis = {
            work: '💼',
            study: '📚',
            personal: '👤',
            health: '💪',
            shopping: '🛒'
        };
        return emojis[category] || '📝';
    }
    
    function formatTime(time) {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }
    
    // ========== ANIMATIONS ==========
    function initAnimations() {
        // Animate stats cards with delay
        document.querySelectorAll('.stat-card').forEach((card, index) => {
            const delay = card.dataset.delay || '0';
            setTimeout(() => {
                card.classList.add('animate__animated', 'animate__fadeInUp');
            }, delay * 1000);
        });
    }
    
    // ========== SPECIAL FEATURES ==========
    function toggleFocusMode() {
        appState.focusMode = !appState.focusMode;
        document.body.classList.toggle('focus-mode', appState.focusMode);
        
        if (appState.focusMode) {
            showNotification('🎯 Focus Mode Activated');
            setFilter('pending');
        } else {
            showNotification('🔓 Focus Mode Deactivated');
            setFilter('all');
        }
    }
    
    function triggerCelebration() {
        console.log('🎉 Triggering celebration...');
        createConfetti();
        playSound('complete');
        showNotification('🎊 Celebration Time!');
    }
    
    function createConfetti() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 20 + 10 + 'px';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            if (elements.confettiContainer) {
                elements.confettiContainer.appendChild(confetti);
            }
            
            setTimeout(() => {
                if (confetti.parentNode) confetti.remove();
            }, 5000);
        }
    }
    
    function showHelp() {
        console.log('❓ Showing help tips...');
        const tips = [
            '💡 Double-click task list to toggle Focus Mode',
            '🎯 Complete high-priority tasks for more focus points',
            '🏆 Earn achievements by completing tasks',
            '🌙 Use dark mode for night sessions',
            '📊 Track your productivity with detailed stats',
            '⚡ Use quick action buttons for common routines'
        ];
        
        tips.forEach((tip, index) => {
            setTimeout(() => {
                showNotification(tip, 'info');
            }, index * 2000);
        });
    }
    
    function checkAchievements() {
        const completedCount = appState.tasks.filter(t => t.completed).length;
        const totalCount = appState.tasks.length;
        
        const newAchievements = [];
        
        if (completedCount >= 1 && !appState.achievements.includes('first_complete')) {
            newAchievements.push({ title: 'First Step!', text: 'Complete your first task' });
            appState.achievements.push('first_complete');
        }
        
        if (completedCount >= 5 && !appState.achievements.includes('task_master')) {
            newAchievements.push({ title: 'Task Master!', text: 'Complete 5 tasks' });
            appState.achievements.push('task_master');
        }
        
        if (completedCount >= 10 && !appState.achievements.includes('productivity_guru')) {
            newAchievements.push({ title: 'Productivity Guru!', text: 'Complete 10 tasks' });
            appState.achievements.push('productivity_guru');
        }
        
        if (totalCount >= 20 && !appState.achievements.includes('task_collector')) {
            newAchievements.push({ title: 'Task Collector!', text: 'Create 20 tasks' });
            appState.achievements.push('task_collector');
        }
        
        newAchievements.forEach((achievement, index) => {
            setTimeout(() => {
                unlockAchievement(achievement.title, achievement.text);
            }, index * 1000);
        });
    }
    
    function unlockAchievement(title, text) {
        if (!elements.achievementToast) return;
        
        const titleEl = elements.achievementToast.querySelector('.achievement-title');
        const textEl = elements.achievementToast.querySelector('.achievement-text');
        
        if (titleEl) titleEl.textContent = title;
        if (textEl) textEl.textContent = text || `Earned: ${title}`;
        
        elements.achievementToast.classList.add('show');
        playSound('notification');
        
        setTimeout(() => {
            elements.achievementToast.classList.remove('show');
        }, 5000);
    }
    
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 
                                 type === 'info' ? 'info-circle' : 'check-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-card);
            border-left: 4px solid ${type === 'error' ? '#f44336' : 
                                  type === 'info' ? '#2196f3' : '#4caf50'};
            border-radius: 10px;
            padding: 15px 20px;
            box-shadow: var(--shadow-lg);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 1000;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // ========== INITIALIZE APP ==========
    initializeApp();
    
    // ========== GLOBAL DEBUG ==========
    // Add debug button to test
    setTimeout(() => {
        const debugBtn = document.createElement('button');
        debugBtn.textContent = '🔧 DEBUG';
        debugBtn.style.cssText = `
            position: fixed;
            bottom: 10px;
            left: 10px;
            z-index: 9999;
            padding: 8px 12px;
            background: #ff4757;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 12px;
            cursor: pointer;
            opacity: 0.7;
        `;
        debugBtn.onclick = () => {
            console.log('=== DEBUG INFO ===');
            console.log('Tasks:', appState.tasks);
            console.log('Theme toggle:', elements.themeToggle?.checked);
            console.log('Sound enabled:', appState.soundEnabled);
            console.log('Quick action buttons:', {
                morning: elements.quickMorningBtn,
                workout: elements.quickWorkoutBtn,
                study: elements.quickStudyBtn
            });
            console.log('==================');
        };
        document.body.appendChild(debugBtn);
    }, 1000);
});



// ========== C++ MAIN BUTTON REDIRECT ==========

// ========== C++ MAIN BUTTON REDIRECT ==========
function initCPPMainButton() {
    console.log('🚀 Initializing C++ main button...');
    
    // Wait a bit to ensure DOM is fully loaded
    setTimeout(() => {
        const cppMainBtn = document.getElementById('cpp-main-btn');
        
        if (!cppMainBtn) {
            console.error('❌ C++ main button NOT FOUND!');
            console.log('Available elements with cpp:', 
                document.querySelectorAll('[id*="cpp"], [class*="cpp"]'));
            return;
        }
        
        console.log('✅ C++ main button found:', cppMainBtn);
        
        // Add click event for redirect
        cppMainBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📁 Redirecting to C++ project page...');
            
            // Play sound if available
            try {
                playSound('click');
            } catch (e) {
                console.log('Sound not available');
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show notification
            showNotification('🚀 Opening C++ project page...', 'info');
            
            // Redirect after short delay
            setTimeout(() => {
                window.location.href = 'cpp.html';
            }, 400);
        });
        
        // Add hover sound
        cppMainBtn.addEventListener('mouseenter', function() {
            try {
                playSound('click');
            } catch (e) {
                // Ignore if sound not available
            }
        });
        
        console.log('✅ C++ main button click event attached');
    }, 500); // Wait 500ms to ensure everything is loaded
}