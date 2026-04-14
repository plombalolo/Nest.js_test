import { MovieService } from './../movie/movie.service';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDto } from './dto/create-reviews.dto';

@Injectable()
export class ReviewService {
    constructor(@InjectRepository(ReviewEntity) private readonly reviewRepository: Repository<ReviewEntity>, private readonly MovieService: MovieService) {}

    async create(dto:CreateReviewDto): Promise<ReviewEntity> {
        const { text, rating, movieId } = dto;
        const movie = await this.MovieService.findById(movieId);


        const review = this.reviewRepository.create({
            text,
            rating,
            movie,
        });
        return await this.reviewRepository.save(review);
}
}
