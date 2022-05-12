import { Task } from './modules/Task.mjs';
import { showAnytimeTask,  showScheduledTask, addBoxIcon, addLightningIcon, showCompleted } from './templates/TaskListTemplates.js';

window.onload = (event) => {
    let tasks = getTasks('tasks'),
    completed = getTasks('completedTasks');
    Object.values(tasks).forEach(showAnytimeTask);
    Object.values(completed).forEach(showCompleted);

    configureRecognition();
}


/**
 * Local storage preparation
 */
 if(!('tasks' in localStorage)) localStorage.setItem('tasks', '{}');
 if(!('counter' in localStorage)) localStorage.setItem('counter', 0);



/**
 * Handle events
 */

$('#anytime-form').submit(function(evt) { //anytime-tasks form
    taskAdmin(evt);
    $('#anytime-task-title').val('');
})

$('#add-anytime-task').click(function(evt) { //trigger form when + is pressed
    $('#anytime-form').submit();
})

$('#title, #description, #date, #start, #end').keyup(function(evt) {
    if (!(formHandler())) $('#add-task-button').prop('disabled', true);

    else $('#add-task-button').prop('disabled', false);
})

$('#add-task-button').click(function(evt) { //trigger when task is added or edited through form    
    if (formHandler()) editTask();
})

function a(x) {
    console.log(x);
}


/**
 * Hub for the addition of tasks
 * @param {event} evt 
 */
function taskAdmin(evt) {
    evt.preventDefault(); //prevent form from submitting
    let result = checkForm(evt);

    if (!result.at(0)) return false; //check the form is not empty

    if (result.at(1) == 'anytime-task') {
        let task = new Task($('#anytime-task-title').val(), null, null, null);
        addTask(task, 'tasks');

        addBoxIcon();
        showToast('New Task', 'has successfully been added', task.title, '#2a6894');
        showAnytimeTask(task);
    }

    else {
        let checkedDate = result.at(2);
        let task = new Task($('#title').val(), $('#description').val(), checkedDate.at(1), checkedDate.at(2));
        addTask(task);
    }
}

/**
 * Retrieves a unique number for id's.
 * Use sparcely and only when needed
 * @returns {number} Current count
 */
export function getCount() {
    if(!('counter' in localStorage)) localStorage.setItem('counter', 0);
    let count = localStorage.getItem('counter');
    count++;
    localStorage.setItem('counter', count)
    return count;
}

/**
 * Checks the time of the task is in the future
 * @returns {boolean}
 */
function checkDate() {
    let date = $('#date').val().split("-"),
    start = $('#start').val().split(":"),
    end = $('#end').val().split(":");

    let startDate = new Date(date.at(0), date.at(1), date.at(2), start.at(0), start.at(1)),
    endDate = new Date(date.at(0), date.at(1), date.at(2), end.at(0), end.at(1));

    let currentTotalTime = getCurrentDate().at(2);
    
    if (startDate.getTime() > endDate.getTime() || startDate.getTime() < currentTotalTime) return [false];
    return [true, startDate, endDate];
}

/**
 * Returns everything needed for the information about the present
 * @returns {Array} Consisting of the time and date in all forms
 */
function getCurrentDate() {
    let dateBuilder = new Date();

    let year = dateBuilder.getFullYear(),   //[-5]
    month = dateBuilder.getMonth() + 1,     //[-4]
    day = dateBuilder.getDate();            //[-3]

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    let hours = dateBuilder.getHours(),     //[-2]
    minutes = dateBuilder.getMinutes();     //[-1]

    let date = `${day}/${month}/${year}`,   //[0]
    time = `${hours}:${minutes}`;           //[1]

    let totalTime = dateBuilder.getTime();  //[2]

    return [date, time, totalTime, year, month, day, hours, minutes];
}

/**
 * Stores task into local storage
 * @param {Task} task 
 * @returns {boolean}
 */
function addTask(task, storage) {
    let tasks = getTasks(storage); //retrieve tasks
    tasks[task.id] = task;
    
    saveTasks(tasks, storage);     //save updated tasks
    return true;
}

/**
 * Validates and checks the content of the submitted form
 * @param {*} evt 
 * @returns {boolean} false if the form is invalid
 */
function checkForm(evt) {
    if (evt.target.id == 'anytime-form') {           //adding an anytime task
       if ($('#anytime-task-title').val() == '') return false;
       return [true, 'anytime-task']
    }

    else {                                          //adding a scheduled task
        let checkedDate = checkDate();
        if (!checkedDate.at(0)) return false;
        return [true, 'scheduled-task', checkedDate]
    }
}

/**
 * Shows toast when a task is added or deleted
 * @param {String} title 
 * @param {String} header 
 * @param {String} taskTitle
 */
function showToast(title, header, taskTitle, color) {
    console.log(title);
    $('.toast-title').html(title);
    $('.toast-body').html(header);
    $('.new-task-alert').html(taskTitle);
    if (color != null) $('#toast-color').attr('fill', color);
    $('.toast').toast('show');	

    let dateBuilder = new Date();
    var minutes = dateBuilder.getMinutes();

    if (minutes < 10) minutes = '0' + minutes;
    let date = dateBuilder.getHours() + ":" + minutes;		
    $('#time').html(date);	
}

/**
 * Returns all tasks as an array containing Task objects
 * @param {String} storage Where to fetch the tasks from
 * @returns {Object.<Task>} tasks
 */
function getTasks(storage) {
    if(!(storage in localStorage)) localStorage.setItem(storage, '{}');

    let tasks = JSON.parse(localStorage.getItem(storage)); //retrieve tasks
    for (const [key, task] of Object.entries(tasks)) {     //transform items to Task objects
        let dateStart = new Date(task.start);
        let dateEnd = new Date(task.end);
        task.start = dateStart;
        task.end = dateEnd;
        Object.setPrototypeOf(task, Task.prototype);    
    }
    return tasks;
}

/**
 * Saves all tasks
 * @param {Object.<Task>} tasks 
 * @param {String} strong Where to save the tasks 
 */
function saveTasks(tasks, storage) {
    tasks = JSON.stringify(tasks);
    localStorage.setItem(storage, tasks);                  
}


/**
 * Deletes a specific task
 * @param {Task} task 
 */
function deleteTask(task, actualDelete) {
    let tasks = getTasks('tasks');
    $('#' + task.id).fadeOut(500, function() {
        $(this.remove);
    })
    delete tasks[task.id];
    if (actualDelete) {
        addBoxIcon();
        showToast('Deleted Task', 'has successfully been deleted', task.title, '#dc3545');
    }
    saveTasks(tasks, 'tasks');
}

/**
 * Configures the voice recognition service
 */
function configureRecognition() {
    var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-GB';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    let resultTarget = $('#description');
    let mic = $('#mic');
    mic.click(function(evt) {
        mic.children('img').addClass('show');
        recognition.start();
    })
    recognition.onresult = function(evt) {
        mic.children('img').removeClass('show');
        let resultText = evt.results[0][0].transcript;
        resultTarget.val(resultText);
    }
}

/**
 * Adds a task to list of completed tasks
 * @param {string} task 
 */
function completeTask(task) {
    deleteTask(task, false);
    addLightningIcon();
    showToast('Task completed', 'has been completed!', task.title);
    addTask(task, 'completedTasks');
    showCompleted(task);
}

function findById(taskId) {
    let tasks = getTasks('tasks');
    let task = tasks[taskId];
    return task;
}

function replaceTask(oldTask, newTask) {
    for (const key of Object.keys(oldTask)) {
        if (key == 'id') continue
        oldTask[key] = newTask[key];
    }
    let tasks = getTasks('tasks');
    tasks[oldTask.id] = oldTask;
    saveTasks(tasks, 'tasks');
}

function setUpForm(task) {
    $('#task-pressed').val(task.id); //set up 
    $('.edit-title').text('Edit Task');
    if (task.description == null) {
        a(task.title);
        $('#title').val(task.title);
        $('#add-task-button').text('Edit Task');
    }
}

function formHandler() {
    if ($('#title').val() == '') return false;
    if (($('#title').val() != '') &&
        ($('#description').val() != '') && ($('#date').val() != '') && ($('#start').val() != '')  && ($('#end').val() != ''))
        return true; 
    if (($('#title').val() != '') && ( 
        ($('#description').val() != '') || ($('#date').val() != '') || ($('#start').val() != '')  || ($('#end').val() != '')
        )) return false;

    return true;
}

function editTask() {
    let oldTask = findById($('#task-pressed').val()),
    newTask = new Task($('#title').val(), null, null, null, null);
    replaceTask(oldTask, newTask);
    location.reload();
}

function deleteCompleted(task) {
    let tasks = getTasks('completedTasks');
    $('#' + task.id + '-completed').fadeOut(500, function() {
        $(this.remove);
    })
    delete tasks[task.id];
    addTask(task, 'deletedTasks');
    
    saveTasks(tasks, 'completedTasks');
    addBoxIcon();
    showToast('Deleted Task', 'has successfully been deleted', task.title, '#dc3545');

}

/**
 * Manages all requests from the template file
 * @param {String} job The function the template wants to call
 * @param {*} context The context of the call
 */
export function templateManager(job, context) {
    if (job == 'completeTask') {                //context is a task here
        completeTask(context);
    }

    if (job == 'setUpForm') {
        setUpForm(context);
    }

    if (job == 'deleteCompleted') {
        deleteCompleted(context);
    }
}




