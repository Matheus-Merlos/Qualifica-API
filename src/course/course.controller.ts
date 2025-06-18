import {
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ParseUserPipe } from 'src/pipes/parse-user.pipe';
import { CreateCourseDTO } from './course.dto';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  private readonly courseService: CourseService;

  @Post(':userId')
  async createCourse(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Body() body: CreateCourseDTO,
  ) {
    try {
      await this.courseService.createCourse(userId, body);
    } catch (error: unknown) {
      throw new InternalServerErrorException(
        `Internal Server Error: ${(error as Error).message}`,
      );
    }
  }
}
