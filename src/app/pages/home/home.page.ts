import { Component, OnInit, inject } from '@angular/core';
import { Episode } from 'src/app/models/episode.model';
import { Season } from 'src/app/models/season.model';
import { LanguageService } from 'src/app/services/language.service';
import { OnepieceService } from 'src/app/services/onepiece.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  seasons: Season[] = [];
  selectedSeason = '';
  episodes: Episode[] = [];
  episodeNumber = '';
  loading: boolean = false;
  limitError: boolean = false;

  languageSvc = inject(LanguageService);
  onePieceSvc = inject(OnepieceService);

  selectedLanguage = '';

  ngOnInit() {
    this.selectedLanguage = localStorage.getItem('language') as string;
    this.getSeasons();
  }

  // cambiar idioma
  setLanguage(){
    this.languageSvc.setLanguage(this.selectedLanguage);
    this.getSeasons();
  }

  getSeasons(){
    this.loading = true;
    this.onePieceSvc.getSeasons().subscribe({
      next: (resp:any)=>{
        this.loading = false;
        console.log(resp);
        this.seasons = resp.seasons;
        this.selectedSeason = this.seasons[0].id;

        this.getEpisodeBySeasons();
      },
      error : (err:any)=>{
        this.loading = false;
        if(err.status === 403) this.limitError = true;
      }
    })
  }

  getEpisodeBySeasons(){
      this.loading = true;
    this.onePieceSvc.getEpisodesbySeasons(this.selectedSeason).subscribe({
      next: (resp:any)=>{
        this.loading = false;
        console.log(resp);
        this.episodes = resp.episodes;
      }
    })
  }

  getEpisode(){
    if(this.episodeNumber){
    this.loading = true;
      this.onePieceSvc.getEpisodes(this.episodeNumber).subscribe({
        next: (resp:any)=>{
          this.loading = false;
          console.log(resp);
          this.episodes = [resp.episode]
        },
        error: (err:any)=>{
          this.loading = false;
          this.episodes = [];
        }
      })
    } else this.getEpisodeBySeasons();
  }
}
