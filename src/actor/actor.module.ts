import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { Type } from 'class-transformer';

@Module({
  controllers: [ActorController],
  providers: [ActorService],
})
export class ActorModule {}
