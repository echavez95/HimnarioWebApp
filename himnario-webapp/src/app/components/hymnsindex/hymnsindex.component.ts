import { Component, OnInit } from '@angular/core';
import { Hymn } from 'src/app/models/hymn';
import { HymnsproviderService } from 'src/app/services/hymnsprovider.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hymnsindex',
  templateUrl: './hymnsindex.component.html',
  styleUrls: ['./hymnsindex.component.css']
})
export class HymnsindexComponent {
  HymnsList: Hymn[]
  search: string

  constructor(public hymnsService: HymnsproviderService, public route: ActivatedRoute, private router: Router)
  {
    this.HymnsList = Array<Hymn>();
    this.route.paramMap.subscribe(params => {
      this.search = params.get('search') as string;
      if(this.search!=null)
      {
        if(!isNaN(parseFloat(this.search)))
        {
          let hymn = hymnsService.searchByNumber(parseFloat(this.search));
          if(hymn!=null) this.router.navigate(['/hymn', hymn.numero]);
        }
        else
        {
          this.HymnsList = hymnsService.searchVerse(this.search);
        }
      }
      else 
      {
        this.HymnsList = hymnsService.HymnsList;
      }
    });
  }
}
