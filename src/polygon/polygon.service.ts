import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Point } from 'geojson';
import { from, Observable } from 'rxjs';
import {  Repository } from 'typeorm';
import { PolygonEntity } from './entity/polygon.entity';
import { Polygon } from './entity/polygon.interface';
import { PolygonModel } from './entity/polygon.model';

@Injectable()
export class PolygonService {
constructor(
    @InjectRepository(PolygonEntity)
    private readonly polygonRepository: Repository<PolygonEntity>,

){}

 proj:any = 4326;
 id:number;
 name:string;
//  geom:Polygon;

    findAllPolygonData(): Observable<PolygonEntity[]>{
        return from(this.polygonRepository.find());
    }

    createPolygonData(polygonModel:PolygonModel): Observable<PolygonEntity> {
    // createMapData(mapModel:MapModel): Promise<Map> {
        
        // let dataGeom:Point = { 
        //     type:'Point',
        //     coordinates : [
        //             parseFloat(mapModel.lat),
        //             parseFloat(mapModel.lon)
        //         ]
        // };

        let dummy = new PolygonEntity();
        // dummy.lat = polygonModel.lat;
        // dummy.lon = polygonModel.lon;
        // dummy.name = polygonModel.name;
        // dummy.city = polygonModel.city;
        // dummy.geom = dataGeom;
                // dummy.geom.type = "Point";
                // dummy.geom.coordinates = [
                //     parseFloat(mapModel.lat),
                //     parseFloat(mapModel.lon)
                // ];

        // ST_SetSRID(ST_MakePoint(-71.1043443253471, 42.3150676015829),4326);
        console.log("dummy-data ",dummy );
        
        console.log("data",polygonModel);

         from(this.polygonRepository.save(polygonModel).then( res => {
                console.log("hited", res);
                
                this.id = res.id ;
                this.name = res.name;
                // this.geom = res.geom;
                // this.lat = parseFloat(res.lat);
                // this.lon = parseFloat(res.lon);
                // this.doSomeQuery();
                // this.UpdatePoint();
                // this.dataSource.query(`UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(${this.lat}, ${this.lon}),${this.proj}) WHERE id=${this.id}`);
                // let rawData  =  this.dataSource.query(`UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(${this.lat}, ${this.lon}),${this.proj}) WHERE id=${this.id}`);
                // console.log("raw ", rawData);
            })
        );
         return;
    }
   
}

 // UpdatePoint
    // UpdatePoint() {
    //     //     // let rawData  =  this.dataSource.query(`UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(${this.lat}, ${this.lon}),${this.proj}) WHERE id=${this.id}`);
    //     //     let rawData  =  this.dataSource.query("UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(-71.1043443253471, 42.3150676015829),4326) WHERE id=1");
    //     //     console.log(rawData);
    //     let abc = `UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(${this.lat}, ${this.lon}),${this.proj}) WHERE id=${this.id}`;
    //     this.dataSource.query(`UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(${this.lat}, ${this.lon}),${this.proj}) WHERE id=${this.id}`);
    //     console.log("executed " ,abc);
    //     return this.dataSource.query(`UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(${this.lat}, ${this.lon}),${this.proj}) WHERE id=${this.id}`);
      
    // }

//   async doSomeQuery() {
//     console.log( "other func ", `UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(${this.lat}, ${this.lon}),${this.proj}) WHERE id=${this.id}`);
    
//     return this.connection.query(`UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(${this.lat}, ${this.lon}),${this.proj}) WHERE id=${this.id}`);
//   }

    // function UpdatePoint1() {
    //     let rawData = this.dataSource.query("UPDATE map_data SET geom = ST_SetSRID(ST_MakePoint(-71.1043443253471, 42.3150676015829),4326) WHERE id=1");
    //     console.log(rawData);
    // }
       
    // updateMapPatch(id: number, mapPatch: MapPatch): Observable<UpdateResult> {
        
    //     return from(this.mapRepository.update(id, mapPatch));
    // }

    // updateGeography(lat,lon) {
    //     let queryGeo  =  "ST_SetSRID(ST_MakePoint(" + lat + ", " + lon + "), 4326)";
    //     return "query"+queryGeo;
    // }