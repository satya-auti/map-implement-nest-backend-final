// import { IsNotEmpty, isNotEmpty } from "class-validator";
import { Point } from "geojson";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity('map_data_1')
export class MapEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    // @IsNotEmpty()
    lat:string;

    @Column()
    // @IsNotEmpty()
    lon: string;

    @Column()
    // @IsNotEmpty()
    name:string;
    
    @Column()
    // @IsNotEmpty()
    city:string;

    @Index({ spatial: true })
    @Column({
        type: 'geography',
        spatialFeatureType: 'Point', 
        srid: 4326,
        nullable: true,
    })
    // @IsNotEmpty()
    geom: Point;

}
