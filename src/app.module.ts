import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapModule } from './map/map.module';
import { ConfigModule } from '@nestjs/config';
import { PolygonModule } from './polygon/polygon.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    // ConfigModule.forRoot({isGlobal:true}),
    // MulterModule.register({
    //   dest: './csv',
    // }),
  
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),MapModule,PolygonModule],
    
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
