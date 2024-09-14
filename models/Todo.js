export default class Todo {

    constructor(title, description, priority , category) {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.category = category;
        this.completed = false;
    }

}