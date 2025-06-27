import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ParseCoursePipe } from 'src/common/pipes/parse-course.pipe';
import { ParseUserPipe } from 'src/common/pipes/parse-user.pipe';
import { SubscriptionDTO } from './subscription.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get(':userId')
  async listSubscribed(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
  ) {
    return await this.subscriptionService.listSubscribed(userId);
  }

  @Post(':userId')
  async subscribe(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Body() dto: SubscriptionDTO,
  ) {
    return await this.subscriptionService.subscribe(userId, dto);
  }

  @Delete(':userId/:courseId')
  async unsubscribe(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Param('courseId', ParseIntPipe, ParseCoursePipe) courseId: number,
  ) {
    return await this.subscriptionService.unsubscribe(userId, courseId);
  }
}
