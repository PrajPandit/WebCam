import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from  '../../products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  data: any;
  private video: HTMLVideoElement;

  constructor(private productsService: ProductsService, private router: Router) {
  }

  ngOnInit() {
    // this.productsService.getData('top-headlines?country=us&category=business').subscribe(data => {
    //   this.data = data;
    // })
    this.webcam_init();
  }

  webcam_init() {
    this.video = <HTMLVideoElement>document.getElementById('vid');
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: { facingMode: 'user' } })
      .then((stream) => {
        this.video.srcObject = stream;
        this.video.onloadedmetadata = () => {
          this.video.play();
        };
      });
  }

  detectFrame = (video, model) => {
    model.detect(video).then((predictions) => {
      this.renderPredictions(predictions);
      requestAnimationFrame(() => {
        this.detectFrame(video, model);
      });
    });
  };

  renderPredictions = (predictions) => {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 900;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Font options.    const font = "16px sans-serif";    ctx.font = font;    ctx.textBaseline = "top";    ctx.drawImage(this.video,0, 0,900,900);    predictions.forEach(prediction => {      const x = prediction.bbox[0];      const y = prediction.bbox[1];      const width = prediction.bbox[2];      const height = prediction.bbox[3];      // Draw the bounding box.      ctx.strokeStyle = "#00FFFF";      ctx.lineWidth = 2;      ctx.strokeRect(x, y, width, height);      // Draw the label background.      ctx.fillStyle = "#00FFFF";      const textWidth = ctx.measureText(prediction.class).width;      const textHeight = parseInt(font, 10); // base 10      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);    });    predictions.forEach(prediction => {      const x = prediction.bbox[0];      const y = prediction.bbox[1];      // Draw the text last to ensure it's on top.      ctx.fillStyle = "#000000";      ctx.fillText(prediction.class, x, y);    });  };
  };
  // onGoToSinglePage(article){
  //   this.productsService.currentArticle = null;
  //   this.productsService.currentArticle = article;
  //   this.router.navigate(['/tabs/tab3']);
  // }
}
