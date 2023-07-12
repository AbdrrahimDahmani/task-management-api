import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './task-dto/createTask.dto';
import { GetTasksFilterDto } from './task-dto/getTasksFilter.dto';
import { UpdateTaskStatusDto } from './task-dto/updateTaskStatus.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
  @Delete('/:id')
  removeTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.removeTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() taskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = taskStatusDto;
    return this.tasksService.updateTask(id, status);
  }
  @Get()
  getTasks(@Query() tasksFilter: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(tasksFilter);
  }
}
