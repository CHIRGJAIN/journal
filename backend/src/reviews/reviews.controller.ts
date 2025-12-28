import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('reviews')
@ApiBearerAuth()
@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('assign')
    @ApiOperation({ summary: 'Assign a reviewer to a manuscript (Editor only)' })
    assign(@Body() body: { manuscriptId: string, reviewerId: string }) {
        return this.reviewsService.assignReviewer(body.manuscriptId, body.reviewerId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id/submit')
    @ApiOperation({ summary: 'Submit a review' })
    submit(@Param('id') id: string, @Body() body: { content: string, decision: string }) {
        return this.reviewsService.submitReview(id, body.content, body.decision);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('my')
    @ApiOperation({ summary: 'Get reviews assigned to me' })
    findMine(@Request() req) {
        return this.reviewsService.findReviewsByReviewer(req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('manuscript/:id')
    @ApiOperation({ summary: 'Get reviews for a manuscript' })
    findForManuscript(@Param('id') id: string) {
        return this.reviewsService.findReviewsForManuscript(id);
    }
}
