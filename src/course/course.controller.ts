import {
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseCoursePipe } from 'src/pipes/parse-course.pipe';
import { ParseUserPipe } from 'src/pipes/parse-user.pipe';
import { CreateCourseDTO, PatchCourseDTO } from './course.dto';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post(':userId')
  async createCourse(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Body() body: CreateCourseDTO,
  ) {
    try {
      return await this.courseService.create(userId, body);
    } catch (error: unknown) {
      throw new InternalServerErrorException(
        `Internal Server Error: ${(error as Error).message}`,
      );
    }
  }

  @Patch(':userId/:courseId')
  async editCourse(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Param('courseId', ParseIntPipe, ParseCoursePipe) courseId: number,
    @Body() body: PatchCourseDTO,
  ) {
    try {
      return await this.courseService.edit(userId, courseId, body);
    } catch (error: unknown) {
      throw new InternalServerErrorException(
        `Internal Server Error: ${(error as Error).message}`,
      );
    }
  }

  @Delete(':userId/:courseId')
  async deleteCourse(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Param('courseId', ParseIntPipe, ParseCoursePipe) courseId: number,
  ) {
    try {
      return await this.courseService.destroy(courseId);
    } catch (error: unknown) {
      throw new InternalServerErrorException(
        `Internal Server Error: ${(error as Error).message}`,
      );
    }
  }
}
