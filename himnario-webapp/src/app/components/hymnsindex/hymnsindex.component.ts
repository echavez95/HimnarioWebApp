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
  VerseSearchResults: any[]
  showSearchInfo: boolean

  constructor(public hymnsService: HymnsproviderService, public route: ActivatedRoute, private router: Router)
  {
    this.HymnsList = Array<Hymn>();
    this.VerseSearchResults = [];
    this.showSearchInfo = false;
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
          if(this.search.trim()!='')
          {
            this.HymnsList = hymnsService.searchVerse(this.search);
            this.VerseSearchResults = hymnsService.VerseSearchResults;
            this.showSearchInfo = true;
          }
        }
      }
      else 
      {
        this.HymnsList = hymnsService.HymnsList;
      }
    });
  }

  getVerseResults(number: number)
  {
    if(this.VerseSearchResults.length > 0)
    {
      let verseList = new Array<string>();
      this.VerseSearchResults.filter(x=> x.number == number).map(y=> y.match).forEach(verse=> {
        verse.forEach((v: string) => { verseList.push(v) });
      });
      
      return verseList;
    }
    else
    {
      return new Array<string>();
    }
  }
}
