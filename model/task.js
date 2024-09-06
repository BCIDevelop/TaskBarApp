export class Task {
  constructor(params) {
    const {
      ownerId,
      title,
      description,
      status,
      category,
      startDate, // '05-10-2024'
      endDate,
      participants = [],
    } = params;

    this.id = crypto.randomUUID();
    this.ownerId = ownerId;
    this.title = title;
    this.description = description;
    this.status = status;
    this.category = category;
    this.startDate = startDate;
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
