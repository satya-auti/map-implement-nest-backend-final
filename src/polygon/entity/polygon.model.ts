import { Point, Polygon } from "geojson";

export class PolygonModel{
    id?: number;

    // lat:string;
    // lon: string;

    name?:string;
    
    // city:string;

    geom?: Polygon;
}