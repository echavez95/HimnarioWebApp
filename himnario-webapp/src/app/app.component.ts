import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Himnario';
  search: string;

  constructor(public router: Router){}

  searchSubmit()
  {
    if(this.search.trim()!='')
    {
      this.router.navigate(['/index', this.search]);
      this.search="";
    }
  }
}
