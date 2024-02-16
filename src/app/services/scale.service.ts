import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ScalesData } from "../models/scale-data";
@Injectable({
    providedIn: 'root',
})
export class ScaleHttpService {

    constructor(private http: HttpClient) {
        
    }

    public get(): Observable<ScalesData> {
        return this.http.get<ScalesData>("./assets/data/uchuva-scales.json");
    }

}