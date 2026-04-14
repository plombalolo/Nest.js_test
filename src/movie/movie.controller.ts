import { Body, Controller, Get, Param, Query, Req, Headers, Res, Post, Put, Delete } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Request, Response } from 'express';
import { MovieDto } from './Dto/movie.dto';

@Controller('movies')
  export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Get()
    findAll() {
      return this.movieService.findAll();
    }

    @Post()
    async create(@Body() dto: MovieDto) {
      return await this.movieService.create(dto);
    }

    @Get(':id')
    findById(@Param('id') id: string) {
      return this.movieService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: MovieDto) {
      await this.movieService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
      await this.movieService.delete(id);
    }
  }



