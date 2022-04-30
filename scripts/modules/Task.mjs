import { getCount } from '../index.js';

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