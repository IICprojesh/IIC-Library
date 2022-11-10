import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @ApiQuery({
    name: 'limit',
    example: 20,
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'skip',
    example: 5,
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'search',
    example: 'np05',
    type: String,
    required: false,
  })
  @Get()
  findAll(
    @Query()
    { limit, skip, search }: { limit: number; skip: number; search: string },
  ) {
    return this.studentService.findAll({ limit, skip, search });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
