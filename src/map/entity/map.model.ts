import { Point } from "geojson";

export class MapModel{
    id: number;

    lat:string;

    lon: string;

    name:string;
    
    city:string;

    geom: Point;
}