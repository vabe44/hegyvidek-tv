import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hirek-scroller',
  templateUrl: './hirek-scroller.component.html',
  styleUrls: ['./hirek-scroller.component.css']
})
export class HirekScrollerComponent implements OnInit {
  hirek: string[];
  text: string;
  constructor() {
    this.hirek = [
      'A legfrissebb hírek és aktualitások olvashatóak itt egy folyamatosan jobbról balra úszó szövegfolyamként.   |',
      'A legfrissebb hírek és aktualitások olvashatóak itt egy folyamatosan jobbról balra úszó szövegfolyamként.   |',
      'A legfrissebb hírek és aktualitások olvashatóak itt egy folyamatosan jobbról balra úszó szövegfolyamként.   |',
      'A legfrissebb hírek és aktualitások olvashatóak itt egy folyamatosan jobbról balra úszó szövegfolyamként.   |',
      'A legfrissebb hírek és aktualitások olvashatóak itt egy folyamatosan jobbról balra úszó szövegfolyamként.   |',
    ];
    this.text = `marquee ${ this.hirek.length * 20 }s linear infinite`;
  }

  ngOnInit() { }

}
