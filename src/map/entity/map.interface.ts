import { Point } from "geojson";

export interface Map{
    id: number;

    lat:string;

    lon: string;

    name:string;
    
    city:string;

    geom: Point;
}