import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Himnario';
  search: string;

  constructor(public router: Router, private swUpdate: SwUpdate){}

  searchSubmit()
  {
    if(this.search.trim()!='')
    {
      this.router.navigate(['/index', this.search]);
      this.search="";
    }
  }

  ngOnInit() {
    // if(this.swUpdate.isEnabled)
    // {
    //   this.swUpdate.activateUpdate().then(() => {
    //     alert("La aplicacion será actualizada!");
    //     window.location.reload();
    //   });
    // }
  }
}
