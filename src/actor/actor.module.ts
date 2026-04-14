import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { Type } from 'class-transformer';
import { MovieModule } from 'src/movie/movie.module';
import { ActorEntity } from './entities/actor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ActorEntity]), MovieModule],
  controllers: [ActorController],
  providers: [ActorService],
})
export class ActorModule {}
