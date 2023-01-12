import { Injectable } from '@angular/core';
import Hymns from 'src/assets/data/himnos.json';
import { Hymn } from 'src/app/models/hymn';
import Enumerable from 'linq'

@Injectable({
  providedIn: 'root'
})
export class HymnsproviderService {
  HymnsList: Hymn[]

  constructor() { 
    this.HymnsList = JSON.parse(JSON.stringify(Hymns));
  }

  searchByNumber(hymnNumber: number)
  {
    return Enumerable.from(this.HymnsList).firstOrDefault(x=> x.numero == hymnNumber) as Hymn;
  }

  searchVerse(verse: string)
  {
    return Enumerable.from(this.HymnsList).where(x=> Enumerable.from(x.versos).contains(verse)).toArray();
  }

  getFirstHymnNumber()
  {
    return Enumerable.from(this.HymnsList).orderBy(x=>x.numero).firstOrDefault() as Hymn;
  }

  getLastHymnNumber()
  {
    return Enumerable.from(this.HymnsList).orderByDescending(x=>x.numero).firstOrDefault() as Hymn;
  }
}
