import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ActorModule } from './actor/actor.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  ActorModule,
  PrismaModule,
  
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
