import { Task } from './modules/Task.mjs';
import { showAnytimeTask,  showScheduledTask } from './templates/TaskListTemplates.js';


window.onload = (event) => {
    $('#title').val('hi');
    $('#description').val('hi');

    $('#date').val('2022-12-22');
    $('#start').val('01:01');
    $('#end').val('02:02');

}


/**
 * Local storage preparation
 */
if(!('tasks' in localStorage)) localStorage.setItem('tasks', '{}');
if(!('counter' in localStorage)) localStorage.setItem('counter', 0);

/**
 * Handle events
 */
$('#add-task-button').click(function(evt) {
    taskAdmin(evt);
})

/**
 * Hub for the addition of tasks
 * @param {event} evt 
 */
function taskAdmin(evt) {
    evt.preventDefault(); //prevent form from submitting

    let checkedDate = checkDate();
    if (!checkedDate.at(0)) return false;

    let task = new Task($('#title').val(), $('#description').val(), checkedDate.at(1), checkedDate.at(2));

    addTask(task);
    
    if (task.description != '') showScheduledTask(task);
    else showAnytimeTask(task);
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
 * Stores tasks into local storage
 * @param {Task} task 
 * @returns {boolean}
 */
function addTask(task) {
    if(!('tasks' in localStorage)) localStorage.setItem('tasks', {});

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[task.id] = task;

    tasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasks);

    task = JSON.parse(tasks)[task.id];

    let date = new Date(task.start);
    let date2 = new Date(task.end);
    task.start = date;
    task.end = date2;
    Object.setPrototypeOf(task, Task.prototype);

    console.log(Object.getPrototypeOf(task));
    console.log(task.getTime());
    console.log(task);

    return true;
}

