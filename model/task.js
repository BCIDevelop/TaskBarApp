import formatDate from "../utils/formatDate.js";

export class Task {
    constructor(params) {
        const {
            id,
            ownerId,
            title,
            description,
            status,
            category,
            startDate, // '05-10-2024'
            endDate,
            participants = [],
        } = params;

        this.id = id ? id : crypto.randomUUID();
        this.ownerId = ownerId;
        this.title = title;
        this.description = description;
        this.status = status;
        this.category = category;
        this.startDate = startDate ? startDate : formatDate(new Date());
        this.endDate = endDate;
        this.participants = participants;
    }
}

export const taskModel = {
    task_id: String(),
    owner: String(),
    description: String(),
    title: String(),
    category: String(),
    status: String(),
    start_date: Date(),
};
