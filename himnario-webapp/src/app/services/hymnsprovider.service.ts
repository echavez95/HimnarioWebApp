import { Injectable } from '@angular/core';
import Hymns from 'src/assets/data/himnos.json';
import Themes from 'src/assets/data/temas.json';
import { Hymn } from 'src/app/models/hymn';
import { Theme } from '../models/theme';
import { tema } from '../models/tema';

@Injectable({
  providedIn: 'root'
})
export class HymnsproviderService 
{
  HymnsList: Hymn[]
  VerseSearchResults: any[]
  ThemesList: Theme[]

  constructor() 
  { 
    this.HymnsList = Array<Hymn>();
    let hymns = Array<any>()
    hymns = JSON.parse(JSON.stringify(Hymns));
    this.ThemesList = JSON.parse(JSON.stringify(Themes));

    hymns.forEach((h)=>{
      this.HymnsList.push({
        numero: h.numero,
        titulo: h.titulo,
        versos: h.versos,
        tema: this.getTheme(h.numero)
      })
    });
    this.VerseSearchResults = [];
  }

  searchByNumber(hymnNumber: number)
  {
    return this.HymnsList.filter(x => x.numero == hymnNumber)[0];
  }

  searchByVerseAndTag(verse: string, tag: string)
  {
    let result = Array<Hymn>();
    this.VerseSearchResults = [];

    if(verse!=null && verse.trim()!='')
    {
      this.VerseSearchResults = [];

      this.HymnsList.forEach(h => {
        let verseMatch = h.versos.filter(v => this.removeAccents(v.trim().toLowerCase()).includes(this.removeAccents(verse).toLowerCase()));
        if(verseMatch.length > 0) {
          result.push(h);
          this.VerseSearchResults.push({
            number: h.numero,
            match: verseMatch
          });
        }
      })
    }
    else 
    {
      result = this.HymnsList;
    }

    if(tag!=null && tag.trim()!='')
    {
      let resulttag = result.filter(h=> h.tema.titulo === tag);
      if(resulttag.length > 0)
      {
        result = resulttag;
      }
      else
      {
        result = result.filter(h=> h.tema.subtema.includes(tag));
      }
    }

    return result;
  }

  searchByVerse(verse: string)
  {
    let result = Array<Hymn>();
    this.VerseSearchResults = [];

    this.HymnsList.forEach(h => {
      let verseMatch = h.versos.filter(v => this.removeAccents(v.trim().toLowerCase()).includes(this.removeAccents(verse).toLowerCase()));
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

  searchByTag(tag: string)
  {
    let result = Array<Hymn>();
    this.VerseSearchResults = [];

    result = this.HymnsList.filter(h=> h.tema.titulo === tag);
    if(result.length > 0)
    {
      return result;
    }
    
    result = this.HymnsList.filter(h=> h.tema.subtema.includes(tag));
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

  removeAccents(verse: string)
  {
    return verse.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  
  getTheme(numero: number)
  {
    let tema = {} as tema;
    tema.subtema = Array<string>();
    this.ThemesList.forEach(t=>{
      t.subtemas.forEach(s=>{
        if(s.himnos.some((h) => h === numero))
        {
          tema.titulo = t.tema
          tema.subtema.push(s.titulo);
        }
      })
    })
    return tema;
  }

  tagExists(tag: string)
  {
    let exists = false;
    this.ThemesList.every(t => {
      if(t.tema === tag)
      {
        exists = true;
        return false;
      }

      t.subtemas.every(s => {
        if(s.titulo === tag) {
          exists = true;
          return false;
        }
        return true;
      });

      if(exists) {
        return false;
      }
      return true;
    })
    return exists;
  }

  getTagsList()
  {
    let tags = Array<string>();
    this.ThemesList.forEach(t => {
       t.subtemas.forEach(s => {
         tags.push(s.titulo);
       });
    });
    return tags.sort();
  }
}
