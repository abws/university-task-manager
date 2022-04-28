import {Task} from 'Task.js';

/**
 * Local storage preparation
 */
if(!('tasks' in localStorage)) localStorage.setItem('task', {});
if(!('counter' in localStorage)) localStorage.setItem('counter', 0);

/**
 * Attach handlers
 */
$('#add-task-button').click(function(evt) {
    taskAdmin(evt);
})

/**
 * Hub for the addition of tasks
 * @param {event} evt 
 */
function taskAdmin(evt) {
    evt.preventDefault();
    if (!checkDate()) return false;
}

/**
 * Retrieves a unique number for id's.
 * Use sparcely and only when needed
 * @returns {number} Current count
 */
function getCount() {
    if(!('counter' in localStorage)) localStorage.setItem('counter', 0);
    let count = localStorage.getItem('counter');
    count++;
    localStorage.setItem('counter', count)
    return count;
}

/**
 * Checks the time of the task is in the future
 * @returns 
 */
function checkDate() {
    $('#date').val().split("/");
    $('#start').val().split(":");
    $('#end').val().split(":");

    if ($('#date').val()) return false;
    
    if ($('#start').val()) return false;
    if ($('#end').val()) return false;
}

/**
 * Returns everything needed for the information about the present
 * @returns {Array} Consisting of the time and date
 */
function getCurrentDate() {
    let dateBuilder = new Date();

    let year = dateBuilder.getFullYear();   //[-5]
    let month = dateBuilder.getMonth() + 1; //[-4]
    let day = dateBuilder.getDate();        //[-3]

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    let hours = dateBuilder.getHours();     //[-2]
    let minutes = dateBuilder.getMinutes(); //[-1]

    let date = '${day}/${month}/${year}';   //[0]
    let time = '${hours}:${minutes}';       //[1]

    return [date, time, year, month, hours, minutes];
}



