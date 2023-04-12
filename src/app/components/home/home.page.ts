import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // data: any;
  // private video: HTMLVideoElement;

  constructor(private router: Router) {}

  ngOnInit() {}

  onGoToWebCamPage() {
    this.router.navigate(['/tabs/scanCurrency']);
  }
}
