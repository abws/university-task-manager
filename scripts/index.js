import { Task } from './modules/Task.mjs';


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

    createTask(task);
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
function createTask(task) {
    if(!('tasks' in localStorage)) localStorage.setItem('tasks', {});

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let taskId = task.id;

    tasks = Object.assign({taskId: task}, tasks);
    tasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasks);

    return true;
}
