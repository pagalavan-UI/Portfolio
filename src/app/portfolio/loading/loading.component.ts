import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {
  @Input() isLoading = true;

  public progress = 0;
  public currentPhrase = 'CRAFTING INTERFACES';
  public phraseIndex = 1;
  public isDismissing = false;
  public isCompleted = false;

  private timer: any;

  ngOnInit(): void {
    this.startEditorialCount();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private startEditorialCount(): void {
    const totalDuration = 1800; // ms - snappy, luxury pace
    const intervalTime = 20; // 20ms update rate
    const totalSteps = totalDuration / intervalTime;
    let step = 0;

    this.timer = setInterval(() => {
      step++;
      const factor = step / totalSteps;
      
      // Luxury smooth ease-out curve
      const eased = 1 - Math.pow(1 - factor, 2.5);
      this.progress = Math.min(100, Math.round(eased * 100));

      this.updatePhrase(this.progress);

      if (this.progress >= 100) {
        clearInterval(this.timer);
        this.dismissLoader();
      }
    }, intervalTime);
  }

  private updatePhrase(prog: number): void {
    if (prog < 30) {
      this.currentPhrase = 'CRAFTING INTERFACES';
      this.phraseIndex = 1;
    } else if (prog < 65) {
      this.currentPhrase = 'ANGULAR & MOBILE ARCHITECTURE';
      this.phraseIndex = 2;
    } else if (prog < 90) {
      this.currentPhrase = 'PERFORMANCE & FLUID MOTION';
      this.phraseIndex = 3;
    } else {
      this.currentPhrase = 'WELCOME';
      this.phraseIndex = 4;
    }
  }

  private dismissLoader(): void {
    this.isDismissing = true;
    setTimeout(() => {
      this.isCompleted = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 600);
    }, 400);
  }
}


