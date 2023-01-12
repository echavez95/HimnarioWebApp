import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hymn } from 'src/app/models/hymn';
import { HymnsproviderService } from 'src/app/services/hymnsprovider.service';

@Component({
  selector: 'app-hymn',
  templateUrl: './hymn.component.html',
  styleUrls: ['./hymn.component.css']
})
export class HymnComponent {
  Number: number
  SelectedHymn: Hymn
  NextHymn: number = 0
  PrevHymn: number = 0

  constructor(public hymnsService: HymnsproviderService, public route: ActivatedRoute)
  {
    this.route.paramMap.subscribe(params => {
      this.Number = parseInt(params.get('number') as string, 10);
      this.SelectedHymn = this.hymnsService.searchByNumber(this.Number);
      this.setNextLast();
    });
  }

  setNextLast()
  {
    let next = this.hymnsService.searchByNumber(this.Number + 1);
    if(next!=null) 
    {
      this.NextHymn = this.Number + 1;
    }
    else 
    {
      this.NextHymn = this.hymnsService.getFirstHymnNumber().numero;
    }

    let previous = this.hymnsService.searchByNumber(this.Number - 1);
    if(previous!=null)
    {
      this.PrevHymn = this.Number - 1;
    }
    else 
    {
      this.PrevHymn = this.hymnsService.getLastHymnNumber().numero;
    }
  }

}
