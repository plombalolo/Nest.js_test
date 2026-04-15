import { MovieService } from './../movie/movie.service';
import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-reviews.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const { text, rating, movieId } = dto;

    const review = this.prismaService.review.create({
      data: {
        text,
        rating,
        movie: {
          connect: {
            id: movieId,
          },
        },
      },
    });
    return review;
  }
}
