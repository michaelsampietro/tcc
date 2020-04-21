import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../models/item';

@Component({
  selector: 'app-view-look',
  templateUrl: './view-look.page.html',
  styleUrls: ['./view-look.page.scss'],
})
export class ViewLookPage implements OnInit {

  look: Item = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.data.look) {
      this.look = this.route.snapshot.data.look;
      this.look.tags = Object.values(this.look.tags);
    } else {
      alert('Não foi possível abrir o look no momento! Tente novamente mais tarde.');
      this.router.navigate(['/tabs/inicio']);
    }
  }

}
