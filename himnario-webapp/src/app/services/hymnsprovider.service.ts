import { Injectable } from '@angular/core';
import Hymns from 'src/assets/data/himnos.json';
import { Hymn } from 'src/app/models/hymn';

@Injectable({
  providedIn: 'root'
})
export class HymnsproviderService {
  HymnsList: Hymn[]
  VerseSearchResults: any[]

  constructor() { 
    this.HymnsList = JSON.parse(JSON.stringify(Hymns));
    this.VerseSearchResults = [];
  }

  searchByNumber(hymnNumber: number)
  {
    return this.HymnsList.filter(x => x.numero == hymnNumber)[0];
  }

  searchVerse(verse: string)
  {
    let result = Array<Hymn>();
    this.VerseSearchResults = [];

    this.HymnsList.forEach(h => {
      let verseMatch = h.versos.filter(v => this.removeAccents(v.trim().toLowerCase()).includes(verse.toLowerCase()));
      if(verseMatch.length > 0) {
        result.push(h);
        this.VerseSearchResults.push({
          number: h.numero,
          match: verseMatch
        });
      }
    })
    return result;
  }

  getFirstHymnNumber()
  {
    return this.HymnsList.slice().sort((a, b) => a.numero - b.numero)[0];
  }

  getLastHymnNumber()
  {
    return this.HymnsList.slice().sort((a, b) => b.numero - a.numero)[0];
  }

  removeAccents(verse: string){
    return verse.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
