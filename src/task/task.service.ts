import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilter } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuidv4(),
  //     title: title,
  //     description: description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  async getTaskById(taskId: string): Promise<Task> {
    const found = await this.taskRepository.findOne(taskId);
    if (!found) {
      throw new NotFoundException();
    } else {
      return found;
    }
  }

  // deleteTaskById(id: string): string {
  //   for (let i = 0; i < this.tasks.length; i++) {
  //     if (this.tasks[i].id === id) {
  //       this.tasks.splice(i, 1);
  //       return 'Successfully deleted the task';
  //     }
  //   }
  // }
  // patchTaskById(id: string, status: string, statusBody: TaskStatus): Task {
  //   for (let i = 0; i < this.tasks.length; i++) {
  //     if (this.tasks[i].id === id) {
  //       this.tasks[i].status = statusBody;
  //       return this.tasks[i];
  //     }
  //   }
  // }
  // getTasksWithFilters(filterDto: GetTaskFilter): Task[] {
  //   const { status, search } = filterDto;
  //   // define a temporary array to hold the result
  //   let tasks: Task[] = this.getAllTasks();
  //   // do something with status
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   // do something with search
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) => task.title === search || task.description === search,
  //     );
  //   }
  //   // do something with both search and status when they are present
  //   if (search && status) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         (task.status === status && task.title === search) ||
  //         task.description === search,
  //     );
  //   }
  //   // return result
  //   return tasks;
  // }
}
