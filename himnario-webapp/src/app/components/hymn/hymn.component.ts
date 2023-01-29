import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hymn } from 'src/app/models/hymn';
import { HymnsproviderService } from 'src/app/services/hymnsprovider.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';

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
  audioPlayer: string = ""
  status: OnlineStatusType = this.onlineStatusService.getStatus(); // get initial status
  showPlayer: boolean

  constructor(public hymnsService: HymnsproviderService, 
      public route: ActivatedRoute, 
      public firestorage: AngularFireStorage,
      public onlineStatusService: OnlineStatusService)
  {
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      this.status = status;
    });

    this.route.paramMap.subscribe(params => {
      this.Number = parseInt(params.get('number') as string, 10);
      this.SelectedHymn = this.hymnsService.searchByNumber(this.Number);
      this.showPlayer = false;
      this.setNextLast();
    });
  }

  isOnline()
  {
    return this.status == OnlineStatusType.ONLINE
  }

  showAudioPlayer()
  {
    this.showPlayer = true;
    this.getAudioFile();
  }

  getAudioFile() {
    this.audioPlayer = '';
    if(this.isOnline())
    {
      let filename = `${this.Number}.ogg`;
      const ref = this.firestorage.ref(filename);
      this.audioPlayer = "";
      ref.getDownloadURL().subscribe((data) => {
        this.audioPlayer = `<audio controls class="align-middle bg-light"><source src="${data}" type="audio/ogg">Your browser does not support the audio element.</audio>`
      });
    }
    else
    {
      this.audioPlayer = '';
    }
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
