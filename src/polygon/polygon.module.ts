import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolygonEntity } from './entity/polygon.entity';
import { PolygonController } from './polygon.controller';
import { PolygonService } from './polygon.service';

@Module({
  imports:[TypeOrmModule.forFeature([PolygonEntity]),],
  controllers: [PolygonController],
  providers: [PolygonService]
})
export class PolygonModule {}
