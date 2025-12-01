import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  @Input() isLoading = true;
  progress = 0;
  particles: Array<{x: number, y: number, delay: number}> = [];

  constructor() { }

  ngOnInit(): void {
    this.generateParticles();
    this.startLoadingAnimation();
  }

  private generateParticles(): void {
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2000
      });
    }
  }

  private startLoadingAnimation(): void {
    const interval = setInterval(() => {
      this.progress += Math.random() * 15;

      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(interval);

        // Hide loading after a short delay
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    }, 200);
  }
}
