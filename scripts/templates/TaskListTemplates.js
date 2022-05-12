import { templateManager } from '../index.js';

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
        'id': task.id + '-list',
        'class': 'list-group-item anytime-task d-flex justify-content-between pe-0',
        'appendTo': '#' + task.id
    })

    $('<div/>', {
        'id': task.id + '-wrapper',
        'appendTo': '#' + task.id + '-list'
    })

    $('<input/>', {
        'class': 'form-check-input rounded-circle tick',
        'type': 'checkbox',
        'id': task.id + '-check',
        on: {
            click: function() {
                $(this).siblings('span').css('text-decoration', 'line-through');
                templateManager('completeTask', task);
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
        'class': 'edit-wrapper',
        'data-bs-toggle': "offcanvas",
        'href': "#offcanvasTop", 
        'role': "button", 
        'aria-controls': "expandable sidebar",
        on: {
            click: function() {
                templateManager('setUpForm', task);
            }
        },
        'appendTo': '#' + task.id + '-list'
    })

    $('<img/>', {
        'class': 'edit-icon img-fluid',
        'appendTo': '#' + task.id + '-edit',
        'src': 'images/pencil.svg'
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

export function addLightningIcon() {
    $('#toast-icon').replaceWith(
        $('<img/>', {
            'class': 'me-2',
            'id': 'toast-icon',
            'src': 'images/lightning.svg',
            'height': '40',
            'width':"40"
        })
    )

}

export function addBoxIcon() {
    $('#toast-icon').replaceWith(
        '<svg id="toast-icon" class="bd-placeholder-img toast-color rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect id="toast-color" width="100%" height="100%" fill="#198754"></rect></svg>'
    )
}

