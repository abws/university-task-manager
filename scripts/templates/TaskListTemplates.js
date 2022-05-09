import { deleteTask } from '../index.js';

/**
 * Holds all reusable components for rendering onto the index page
 */

export function showAnytimeTask(task) {
    $('<div/>', {
        'id': task.id,
        'class': 'mb-3',
        'appendTo': '#anytime-tasks'
    })

    $('<li/>', {
        'id': task.id + '-wrapper',
        'class': 'list-group-item anytime-task',
        'appendTo': '#' + task.id
    })

    $('<input/>', {
        'class': 'form-check-input rounded-circle tick',
        'type': 'checkbox',
        'id': task.id + '-check',
        on: {
            click: function() {
                $(this).siblings('span').css('text-decoration', 'line-through');
                //deleteTask(task);
            }
        },
        'appendTo': '#' + task.id + '-wrapper'
    })

    $('<span/>', {
        'class': 'mx-2',
        'text': task.title,
        'appendTo': '#' + task.id + '-wrapper'
    })

    $('<a/>', {
        'id': task.id + '-edit',
        'href': '#',
        'appendTo': '#' + task.id + '-wrapper'
    })

    $('<i/>', {
        'class': 'bi bi-pencil float-end',
        'appendTo': '#' + task.id + '-edit'
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