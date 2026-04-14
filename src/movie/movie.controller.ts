import { Body, Controller, Get, Param, Query, Req, Headers, Res, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Request, Response } from 'express';
import { CreateMovieDto } from './Dto/create-mobvie.dto';

@Controller('movies')
  export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Get()
    findAll() {
      return this.movieService.findAll();
    }

    @Post()
    async create(@Body() dto: CreateMovieDto) {
      return await this.movieService.create(dto);
    }
  }

