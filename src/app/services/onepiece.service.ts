import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OnepieceService {

  http = inject(HttpClient);

  getSeasons(){
    return this.http.get(environment.baseUrl + environment.seasons)
  }

  getEpisodesbySeasons(id:string){
    return this.http.get(environment.baseUrl + environment.episodes_by_season + id)
  }
  getEpisodes(number:string){
    return this.http.get(environment.baseUrl + environment.episode + number)
  }
}
