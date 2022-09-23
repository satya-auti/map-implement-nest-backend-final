// import { IsNotEmpty, isNotEmpty } from "class-validator";
import { Point, Polygon } from "geojson";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity('polygon_data_1')
export class PolygonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    // @IsNotEmpty()
    name:string;

    @Index({ spatial: true })
    @Column({
        type: 'geography',
        spatialFeatureType: 'Polygon', 
        srid: 4326,
        nullable: true,
    })
    geom: Polygon;

}
