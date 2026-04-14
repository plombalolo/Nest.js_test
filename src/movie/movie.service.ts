import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieEntity } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieDto } from './Dto/movie.dto';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { MoviePosterEntity } from './entities/poster.entity';

@Injectable()
export class MovieService {
    constructor(@InjectRepository(MovieEntity) private readonly movieRepository: Repository<MovieEntity>, @InjectRepository(ActorEntity) private readonly actorRepository: Repository<ActorEntity>, @InjectRepository(MoviePosterEntity) private readonly moviePosterRepository: Repository<MoviePosterEntity>) {}

    async findAll():Promise<MovieEntity[]> {
        return await this.movieRepository.find({
            order: {
                createAt: 'DESC',
            },
            where: {
                IsAvailable: true,
            }
        });
    }

    async findById(id: string):Promise<MovieEntity> {
        const movie = await this.movieRepository.findOne({
            where: {
                id,
            },
            relations: ['actors'],
        });
        
        if (!movie) throw new NotFoundException('Movie not found');

        return movie;
    }

    async create(dto: MovieDto):Promise<MovieEntity> {
        const { title, releaseYear, actorIds, imageUrl } = dto;

        const actors = await this.actorRepository.find({
            where: {
                id: In(actorIds),
            }
        });
        
        if (!actors || !actors.length) throw new NotFoundException('One or more actors not found');

        const movie = this.movieRepository.create({
            title,
            releaseYear, 
            actors,
        });

        let poster: MoviePosterEntity | null = null;

        if(imageUrl) {
            poster = this.moviePosterRepository.create({
                imageUrl,
            });
            await this.moviePosterRepository.save(poster);
        }

        const result = await this.movieRepository.save(movie);
        return result;
    }

    async update(id: string, dto: MovieDto): Promise<boolean> {
        const movie = await this.findById(id);

            Object.assign(movie, dto);

            await this.movieRepository.save(movie);
            return true;
        }   

    async delete (id: string): Promise<string> {
        const movie = await this.findById(id);

        await this.movieRepository.remove(movie);
        return movie.id;
    }
}


