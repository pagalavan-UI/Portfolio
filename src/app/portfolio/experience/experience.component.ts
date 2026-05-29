import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements AfterViewInit {

  constructor(
    private animationService: AnimationService,
    private el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    const header = this.el.nativeElement.querySelector('.section-header');
    if (header) this.animationService.revealElement(header);

    const entries = this.el.nativeElement.querySelectorAll('.timeline-entry');
    entries.forEach((entry: HTMLElement, i: number) => {
      if (i % 2 === 0) {
        this.animationService.revealFromLeft(entry, i * 0.12);
      } else {
        this.animationService.revealFromRight(entry, i * 0.12);
      }
    });
  }
}
