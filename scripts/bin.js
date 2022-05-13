console.log('Hi');


window.onload = (event) => {
    let tasks = getTasks('deletedTasks');
    Object.values(tasks).forEach(showDeleted);
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

export function showDeleted(task) {
    $('<div/>', {
        'id': task.id + '-deleted',
        'class': 'mb-3',
        'appendTo': '#deleted-tasks'
    })

    $('<li/>', {
        'id': task.id + '-list-deleted',
        'class': 'list-group-item anytime-task d-flex justify-content-between pe-0',
        'appendTo': '#' + task.id + '-deleted'
    })

    $('<div/>', {
        'id': task.id + '-wrapper-deleted',
        'appendTo': '#' + task.id + '-list-deleted'
    })

    $('<span/>', {
        'class': 'mx-2 ',
        'text': task.title,
        'appendTo': '#' + task.id + '-wrapper-deleted'
    })
}

/**
 * Class representing all tasks
 */
 export class Task {
    constructor(title, description, start, end) {
        this.id = this.#buildId();
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
    }

    #buildId() {
        return 'task' + getCount();
    }

    /**
     * Used to order tasks by start
     * @returns {integer} The comparative time between tasks
     */
    getTime() {
        return this.start.getTime();
    }
}