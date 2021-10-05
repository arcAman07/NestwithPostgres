import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }
  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }
  @Delete(':id')
  deleteTaskById(@Param('id') id: string): string {
    return this.taskService.deleteTaskById(id);
  }
}
