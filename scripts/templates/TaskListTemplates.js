/**
 * Holds all reusable components for rendering onto the index page
 */

export function showAnytimeTask(task) {
    $('<div/>', {
        'id': task.id,
        'class': 'mb-2',
        //text: task.title,
        'appendTo': '#anytime-task'
    })

    $('<li/>'), {
        'class': 'list-group-item anytime-task',
        appendTo: '#' + task.id,
    }

    $('<input/>')
    $('<span/>')
    $('<a/>')

}

export function showScheduledTask(task) {
    $('<li/>', {
        id: task.id,
        class: 'list-group-item',
        text: task.title,
        appendTo: '#scheduledTasks'
    })
}

<div class="mb-2">
<li class="list-group-item anytime-task">
    <input class="form-check-input rounded-circle tick" type="checkbox" value="" id="flexCheckDefault">
    <span class="mx-2">This is a list of tasks</span>
    <a href="#"><i class="bi bi-pencil float-end"></i></a>
</li>
</div>