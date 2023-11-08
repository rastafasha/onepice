import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  router = inject(Router);

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    setTimeout(()=>{
      this.router.navigateByUrl('home');
    },2800)
  }

}
