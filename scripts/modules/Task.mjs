import { getCount } from '../index.js';

/**
 * Class representing all tasks
 */
export class Task {
    constructor(title, description, date, start, end) {
        this.id = getCount();
        this.title = title;
        this.description = description;
        this.date = date;
        this.start = start;
        this.end = end;
    }

    get title() {
        return this.title;
    }

    set title(title){
        this.title = title;
    }

    get description() {
        return this.description;
    }

    set description(description){
        this.description = description;
    }

    get date() {
        return this.date;
    }

    set date(date){
        this.date = date;
    }

    get start() {
        return this.start;
    }

    set start(start){
        this.start = start;
    }

    get end() {
        return this.end;
    }

    set end(end){
        this.end = end;
    }
}