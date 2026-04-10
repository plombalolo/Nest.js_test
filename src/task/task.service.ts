import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTasdkDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
    private tasks = [
        {
          id : 1,
          title : 'Learm Nest.js',
          isCompleted : false,
        },
        {
          id : 2,
          title : 'Build API',
          isCompleted : true,
        }
      ]
    findALl() {
    return this.tasks;
  }

  findById(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
        throw new NotFoundException('Task not found');
    }
    return task;
  }

  create(dto: CreateTaskDto) {
        const newTask = {
        id: this.tasks.length + 1,
        title: dto.title,
        isCompleted: false,
    };

    this.tasks.push(newTask);
    return newTask; 
    }

    update(id: number, dto: UpdateTasdkDto) {
        const { title, isCompleted } = dto;

        const task = this.findById(id);
        task.title = title;
        task.isCompleted = isCompleted;

        return task;
  }

    patchUpdate(id: number, dto: Partial<UpdateTasdkDto>) {
    const task = this.findById(id);

    Object.assign(task, dto);
    return task;
  }

  delete(id: number) {
    const task = this.findById(id);

    this.tasks = this.tasks.filter((t) => t.id !== id);
    return task;
  }
}
