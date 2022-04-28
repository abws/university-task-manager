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



