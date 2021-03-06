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
import { Logger } from '@nestjs/common';
@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  private logger = new Logger('TasksController'); // TimeStamps can be enabled in the logger
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
    this.logger.verbose(`User "${user.username}" retrieving all tasks.`);
    return this.taskService.getAllTasks(user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.log(`New User task created by "${user.username}""`);
    return this.taskService.createTask(createTaskDto, user);
  }
  @Get(':id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }
  @Delete(':id')
  deleteTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<string> {
    return this.taskService.deleteTaskById(id, user);
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
