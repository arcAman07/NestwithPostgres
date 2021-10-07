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
  UseGuards,
} from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilter } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private taskService: TaskService) {}

  // @Get()
  // getTasks(@Query() filterDto: GetTaskFilter): Task[] {
  //   // if we have any filter defined, call taskService.getTasksWithFilters
  //   // otherwise get all tasks
  //   if (Object.keys(filterDto).length > 0) {
  //     return this.taskService.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.taskService.getAllTasks();
  //   }
  // }

  @Get()
  getAllTasks(@GetUser() user: User): Promise<Task[]> {
    return this.taskService.getAllTasks(user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }
  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }
  @Delete(':id')
  deleteTaskById(@Param('id') id: string): Promise<string> {
    return this.taskService.deleteTaskById(id);
  }
  // @Patch(':id/status')
  // patchTaskById(
  //   @Param('id') id: string,
  //   @Param('status') status: string,
  //   @Body('statusBody') statusBody: TaskStatus,
  // ): Task {
  //   const found = this.taskService.patchTaskById(id, status, statusBody);
  //   if (!found) {
  //     throw new NotFoundException();
  //   } else {
  //     return found;
  //   }
  // }
}
