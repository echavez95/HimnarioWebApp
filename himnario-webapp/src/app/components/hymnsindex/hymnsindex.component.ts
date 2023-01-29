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
  searchLabel: string[]
  VerseSearchResults: any[]
  tagFilter: string

  constructor(public hymnsService: HymnsproviderService, public route: ActivatedRoute, private router: Router)
  {
    this.route.queryParams.subscribe(params => {
      this.search = params['search'];
      this.tagFilter = params['tag'];
      this.LoadHymns();
    });
  }

  ResetIndex()
  {
    this.search = '';
    this.tagFilter = '';
    this.LoadHymns();
  }

  LoadHymns()
  {
    this.HymnsList = Array<Hymn>();
    this.VerseSearchResults = [];
    this.searchLabel = ['',''];
    
    if(this.search!=null && this.search.trim()!='')
    {
      if(!isNaN(parseFloat(this.search)))
      {
        let hymn = this.hymnsService.searchByNumber(parseFloat(this.search));
        if(hymn!=null) this.router.navigate(['/hymn', hymn.numero]);
      }
      else
      {
        this.HymnsList = this.hymnsService.searchByVerse(this.search);
        this.VerseSearchResults = this.hymnsService.VerseSearchResults;
        this.searchLabel[0] = 'resultados de busqueda para';
        this.searchLabel[1] = this.search.slice();
      }
    }
    else if(this.tagFilter!=null && this.tagFilter.trim()!='')
    {
      if(this.hymnsService.tagExists(this.tagFilter)) {
        this.HymnsList = this.hymnsService.searchByTag(this.tagFilter);
        this.searchLabel[0] = 'Himnos con la etiqueta';
        this.searchLabel[1] = this.tagFilter.slice();
      }
    }
    else 
    {
      this.HymnsList = this.hymnsService.HymnsList;
    }
  }

  getVerseResults(numero: number)
  {
    if(this.VerseSearchResults.length > 0)
    {
      let verseList = new Array<string>();
      this.VerseSearchResults.filter(x=> x.number == numero).map(y=> y.match).forEach(verse=> {
        verse.forEach((v: string) => { 
          if(v[0]=='>') v = v.substring(1);
          verseList.push(v) 
        });
      });
      
      return verseList;
    }
    else
    {
      return new Array<string>();
    }
  }

  redirect(page:string, value:string, event: Event)
  {
    event.stopPropagation();
    if(page==='hymn')
    {
      this.router.navigate(['/hymn', value]);
    }
    else if(page === 'index')
    {
      this.router.navigate(['/index'], { queryParams : { tag : value }});
    }
  }
}
