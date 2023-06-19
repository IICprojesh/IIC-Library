import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_, file, callback) => {
        if (!file)
          callback(
            new BadRequestException('File is not a valid image.'),
            false,
          );
        const validMimeTypes = ['image/jpeg', 'image/png'];
        if (validMimeTypes.find((mimeType) => mimeType === file.mimetype))
          callback(null, true);
        else
          callback(
            new BadRequestException('File is not a valid image.'),
            false,
          );
      },
    }),
  )
  create(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    return this.studentService.create(avatar, createStudentDto);
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
    @Query('limit') limit = 13,
    @Query('skip') skip = 0,
    @Query('search') search?: string,
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
