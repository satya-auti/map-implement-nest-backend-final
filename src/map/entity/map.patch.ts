import { Point } from "geojson";

export class MapPatch{
    id ?: number;

    lat ?: string;

    lon ?: string;

    name ?: string;
    
    city ?: string;

    geom : Point;
}