/**
 * Holds all reusable components for index page
 */

export function showAnytimeTask(task) {
    $('<li/>', {
        id: task.id,
        class: 'list-group-item',
        text: task.title,
        appendTo: '#anyTimeTasks'
    })
}

export function showScheduledTask(task) {
    $('<li/>', {
        id: task.id,
        class: 'list-group-item',
        text: task.title,
        appendTo: '#scheduledTasks'
    })
}