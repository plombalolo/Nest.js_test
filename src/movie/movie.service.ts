import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieDto } from './Dto/movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie, MoviePoster } from '@prisma/client';
@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.movie.findMany({
      where: {
        isAvailable: true,
      },
      orderBy: {
        releaseYear: 'desc',
      },
      select: {
        id: true,
        title: true,
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  // async findById(id: string): Promise<Movie> {
  //   const movie = await this.prismaService.movie.findUnique({
  //     where: { id },
  //     include: { actors: true },
  //   });

  //   if (!movie) throw new NotFoundException('Movie not found');
  //   return movie;
  // }

  async create(dto: MovieDto): Promise<Movie> {
    const { title, releaseYear, actorIds, imageUrl } = dto;

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: actorIds },
      },
    });

    if (!actors || !actors.length) {
      throw new NotFoundException('One or more actors not found');
    }

    const posterData: any = imageUrl
      ? { create: { url: imageUrl } }
      : undefined;

    const movie = await this.prismaService.movie.create({
      data: {
        title,
        releaseYear,
        poster: imageUrl
          ? {
              create: {
                url: imageUrl,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => ({
            id: actor.id,
          })),
        },
      },
    });

    return movie;
  }
}

//     async update(id: string, dto: MovieDto): Promise<boolean> {
//         const movie = await this.findById(id);

//             Object.assign(movie, dto);

//             await this.movieRepository.save(movie);
//             return true;
//         }

//     async delete (id: string): Promise<string> {
//         const movie = await this.findById(id);

//         await this.movieRepository.remove(movie);
//         return movie.id;
//     }
// }
