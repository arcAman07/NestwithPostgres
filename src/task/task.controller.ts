import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilter } from './dto/get-task-filter.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilter): Task[] {
    // if we have any filter defined, call taskService.getTasksWithFilters
    // otherwise get all tasks
    if (Object.keys(filterDto).length > 0) {
      return this.taskService.getTasksWithFilters(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }
  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    const found = this.taskService.getTaskById(id);
    if (!found) {
      throw new NotFoundException();
    } else {
      return found;
    }
  }
  @Delete(':id')
  deleteTaskById(@Param('id') id: string): string {
    return this.taskService.deleteTaskById(id);
  }
  @Patch(':id/status')
  patchTaskById(
    @Param('id') id: string,
    @Param('status') status: string,
    @Body('statusBody') statusBody: TaskStatus,
  ): Task {
    return this.taskService.patchTaskById(id, status, statusBody);
  }
}
