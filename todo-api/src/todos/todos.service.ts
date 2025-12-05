import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
    ) { }

    // Get todos
    async findAll(): Promise<Todo[]> {
        return this.todoRepository.find({
            order: { createdAt: 'DESC' },
        });
    }

    // Create todo
    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        const todo = this.todoRepository.create({
            title: createTodoDto.title,
            isCompleted: false,
        });
        return this.todoRepository.save(todo);
    }

    // Toggle todo completion
    async toggle(id: string): Promise<Todo> {
        const todo = await this.todoRepository.findOne({ where: { id } });
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        todo.isCompleted = !todo.isCompleted;
        return this.todoRepository.save(todo);
    }

    // Delete todo
    async delete(id: string): Promise<void> {
        const result = await this.todoRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException('Todo not found');
        }
    }
}