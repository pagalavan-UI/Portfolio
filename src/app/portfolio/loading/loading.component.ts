import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {
  @Input() isLoading = true;

  progress = 0;
  currentGear = 1;
  rpm = 2800;
  statusText = 'INITIALIZING COMBUSTION ENGINE...';
  isLaunching = false;
  isCompleted = false;

  private timer: any;
  private smokeInterval: any;
  smokeParticles: Array<{ id: number; size: number; left: number; top: number; opacity: number }> = [];
  private particleCounter = 0;

  ngOnInit(): void {
    this.startLoadingSequence();
    this.startSmokeGenerator();
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
    if (this.smokeInterval) clearInterval(this.smokeInterval);
  }

  private startLoadingSequence(): void {
    const totalDuration = 2200; // ms
    const intervalTime = 30; // update every 30ms
    const totalSteps = totalDuration / intervalTime;
    let step = 0;

    this.timer = setInterval(() => {
      step++;
      // Non-linear easing: accelerating progress
      const factor = step / totalSteps;
      const eased = Math.min(1, Math.pow(factor, 1.2));
      this.progress = Math.min(100, Math.round(eased * 100));

      this.updateTelemetry(this.progress);

      if (this.progress >= 100) {
        clearInterval(this.timer);
        this.triggerLaunch();
      }
    }, intervalTime);
  }

  private updateTelemetry(prog: number): void {
    if (prog < 20) {
      this.currentGear = 1;
      this.rpm = 2800 + Math.round((prog / 20) * 3500);
      this.statusText = 'IGNITION // SPINNING UP CORE ENGINES';
    } else if (prog < 45) {
      this.currentGear = 2;
      this.rpm = 4200 + Math.round(((prog - 20) / 25) * 3200);
      this.statusText = 'SHIFTING GEAR 02 // MOUNTING ASSETS & DOM';
    } else if (prog < 70) {
      this.currentGear = 3;
      this.rpm = 5400 + Math.round(((prog - 45) / 25) * 2800);
      this.statusText = 'SHIFTING GEAR 03 // COMPILING EDITORIAL SYSTEM';
    } else if (prog < 90) {
      this.currentGear = 4;
      this.rpm = 6500 + Math.round(((prog - 70) / 20) * 2400);
      this.statusText = 'SHIFTING GEAR 04 // OPTIMIZING PERFORMANCE METRICS';
    } else {
      this.currentGear = 5;
      this.rpm = 7800 + Math.round(((prog - 90) / 10) * 1600);
      this.statusText = 'REDLINE // CALIBRATING SYSTEM OUTPUT';
    }
  }

  private triggerLaunch(): void {
    this.currentGear = 6;
    this.rpm = 9200;
    this.statusText = 'FULL THROTTLE // LAUNCHING PORTFOLIO';
    this.isLaunching = true;

    // After launch burn acceleration, dismiss loader
    setTimeout(() => {
      this.isCompleted = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    }, 600);
  }

  private startSmokeGenerator(): void {
    this.smokeInterval = setInterval(() => {
      if (this.isCompleted) return;
      
      this.smokeParticles.push({
        id: this.particleCounter++,
        size: 8 + Math.random() * 16,
        left: 20 + Math.random() * 15,
        top: 65 + Math.random() * 15,
        opacity: 0.6 + Math.random() * 0.4
      });

      if (this.smokeParticles.length > 15) {
        this.smokeParticles.shift();
      }
    }, 90);
  }

  trackBySmoke(index: number, item: any): number {
    return item ? item.id : index;
  }
}
