import { Injectable } from '@nestjs/common';
import { MovieEntity } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './Dto/create-mobvie.dto';

@Injectable()
export class MovieService {
    constructor(@InjectRepository(MovieEntity) private readonly movieRepository: Repository<MovieEntity>) {}

    async findAll():Promise<MovieEntity[]> {
        return await this.movieRepository.find({
            order: {
                createAt: 'DESC',
            },
            where: {
                IsPublic: true,
            }
        });
    }

    async create(dto: CreateMovieDto):Promise<MovieEntity> {
        const movie = this.movieRepository.create(dto);

        const result = await this.movieRepository.save(movie);
        return result;
    }
}


