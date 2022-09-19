import { Body, Controller, Get, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readFileSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { map, Observable } from 'rxjs';
import { MapEntity } from './entity/map.entity';
import { Map } from './entity/map.interface';
import { MapModel } from './entity/map.model';
import { MapService } from './map.service';
import {parse} from 'papaparse';
import { Point } from 'geojson';

@Controller('map')
export class MapController {
    constructor(private mapService: MapService){}
    // const proj =4326; 
    csvpath:string;
    allMapData:[];
    csvPath:string;
    allMapData1:any = [];
    // allMapData1: [];

    @Get()
    findAllMapData(): Observable<Map[]> {
      console.log("function called"); 
      return this.mapService.findAllMapData();
    }

    @Post()
    createMapData(@Body() mapModel:MapModel): Observable<MapEntity> {
    // createMapData(@Body() mapModel:MapModel): Promise<Map> {

        // let dummy = new MapEntity();
        // dummy.lat = mapModel.lat;
        // dummy.lon = mapModel.lon;
        // dummy.name = mapModel.name;
        // dummy.city = mapModel.city;
        // ST_SetSRID(ST_MakePoint(-71.1043443253471, 42.3150676015829),4326);

        let queryGeo  =  "ST_SetSRID(ST_MakePoint(" + mapModel.lat + ", " + mapModel.lon + "), 4326)";
        console.log("query "+queryGeo);
        
        return this.mapService.createMapData(mapModel);
    }
    
    @Post('upload')
    @UseInterceptors(FileInterceptor('csv',{
        storage: diskStorage({
        destination: './csv',
        filename:(req, csv, callback) =>{
            const uniqueSuffix = Date.now() +'-'+ Math.round(Math.random()*1e9);
            const ext = extname(csv.originalname);
            // const filename = `${image.originalname}-${uniqueSuffix}${ext}`;
            const filename = `${uniqueSuffix}${ext}`;
            callback(null,filename);
        }
        }),
    }),
    )

    handleUploadCSV(@UploadedFile() csv:Express.Multer.File){
            this.csvpath = csv.path;
            console.log('csv - ', csv); 
            console.log('path',csv.path);
            console.log("file upload API "+this.csvpath);
            this.csvPath = this.csvpath;
            this.uploadFile();
            return this.csvpath;
    }

    @Get('csv/:csv')
    getUploadedCSV(@Param('csv') csv, @Res() res) {
        
        console.log("data show ", res);
        // return res.sendFile(csv, { root: './csv' });
        // let showCsv = res.readFile(csv,{ root: './csv' });
        res.sendFile(csv, { root: './csv' });
        console.log("res Data" ,res);
        // this.uploadFile();
         return;
    }

    @Get("read")
    getCsvData(){ 
        let csvToJson = require('convert-csv-to-json');
        // let fileInputName = './csv/1663585090185-167916819.csv'; 
        // let fileOutputName = 'myOutputFile.json';
        // csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);

        // let json = csvToJson.getJsonFromCsv("./csv/1663585090185-167916819.csv");
        let json =csvToJson.parseSubArray(',',':').getJsonFromCsv('./csv/1663585090185-167916819.csv');
        // let json1 =csvToJson.parseSubArray('*',',').getJsonFromCsv('./csv/1663585090185-167916819.csv');
        for(let i=0; i<json.length;i++){
            console.log(json[i]);
            let obj = json[i];
            let data1 = obj["\"id\",\"lat\",\"lon\",\"name\",\"city\""];
            console.log("data ", obj["\"id\",\"lat\",\"lon\",\"name\",\"city\""]);
        }
        // csvToJson.parseSubArray('*',',').getJsonFromCsv('./csv/1663578381392-278646809.csv');
        this.allMapData = json;
        console.log("allMapData",this.allMapData );
    }

    // @Get("read1")
    async uploadFile() {
        const csvFile = readFileSync('./'+this.csvPath);
        // const csvFile = readFileSync('./csv/1663585090185-167916819.csv');
        const csvData = csvFile.toString();
        const parsedCSV = await parse(csvData, {
          header: true,
          skipEmptyLines: true,
          //  transformHeader:(header)=> header.toLowerCase().replace('#', '').trim(),
          complete: (results) => results.data,
        });
        console.log(parsedCSV);
        parsedCSV.data.map((ele)=>{
            let data3:any = ele;
            this.allMapData1.push(data3);
        });
        console.log("single ",parsedCSV.data[0]);
        console.log("array data ", this.allMapData1);
        
        let ele = this.allMapData1 ;

        for (let i = 0; i < ele.length; i++) {
    
            let dataGeom:Point = { 
                type:'Point',
                coordinates : [
                        parseFloat(ele[i].lat),
                        parseFloat(ele[i].lon)
                    ]
            };
            let mapObject = new MapEntity();
                mapObject.lat = ele[i].lat;
                mapObject.lon = ele[i].lon;
                mapObject.name = ele[i].name;
                mapObject.city = ele[i].city;
                mapObject.geom = dataGeom;
                // mapObject.geom.type = "Point";
                // mapObject.geom.coordinates = [
                //     parseFloat(ele[i].lat),
                //     parseFloat(ele[i].lon)
                // ];
            console.log("dummy - > ",mapObject );
             this.mapService.createMapData(mapObject);
        }
        this.allMapData1 = [];
  
      }

}

// {
//     "id": 12,
//     "lat": "76.61351611",
//     "lon": "29.15937",
//     "name": "Satya8",
//     "city": "belhe",
//     "geom": {
//         "type": "Point",
//         "coordinates": [
//             76.61351611,
//             29.15937
//         ]
//     }
// }