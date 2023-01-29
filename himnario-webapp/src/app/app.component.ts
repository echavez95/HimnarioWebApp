import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

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
      this.router.navigate(['/index'], { queryParams : { search : this.search }});
      this.search="";
    }
  }

  ngOnInit() {
    if(this.swUpdate.isEnabled)
    {
      this.swUpdate.versionUpdates.pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(evt => {
          document.location.reload();
      });
    }
  }
}
