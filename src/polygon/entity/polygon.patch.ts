import { Point, Polygon } from "geojson";

export class PolygonPatch{
    id ?: number;

    // lat ?: string;

    // lon ?: string;

    name ?: string;
    
    // city ?: string;

    geom : Polygon;
}