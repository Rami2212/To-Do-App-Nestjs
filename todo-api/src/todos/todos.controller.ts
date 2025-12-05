import { 
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    HttpCode,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    // Get todos
    @Get()
    async findAll(): Promise<Todo[]> {
        return this.todosService.findAll();
    }

    // Create todo
    @Post()
    async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
        return this.todosService.create(createTodoDto);
    }

    // Toggle todo completion
    @Patch(':id/toggle')
    async toggle(@Param('id') id: string): Promise<Todo> {
        return this.todosService.toggle(id);
    }

    // Delete todo
    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string): Promise<void> {
        return this.todosService.delete(id);
    }
}