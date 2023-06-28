import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './task-dto/createTask.dto';
import { GetTasksFilterDto } from './task-dto/getTasksFilter.dto';
import { UpdateTaskStatusDto } from './task-dto/updateTaskStatus.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() tasksFilter: GetTasksFilterDto) {
    if (Object.keys(tasksFilter).length > 0) {
      return this.tasksService.searchTasks(tasksFilter);
    }
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Task {
    return this.tasksService.removeTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() taskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = taskStatusDto;
    return this.tasksService.updateTask(id, status);
  }
}
