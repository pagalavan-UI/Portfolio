import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {

  constructor(
    private animationService: AnimationService,
    private el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    // Directional reveals
    const left = this.el.nativeElement.querySelector('.gsap-left');
    const right = this.el.nativeElement.querySelector('.gsap-right');
    if (left) this.animationService.revealFromLeft(left);
    if (right) this.animationService.revealFromRight(right, 0.15);

    // Animated stat counters
    const counters = this.el.nativeElement.querySelectorAll('.counter[data-target]');
    counters.forEach((el: HTMLElement) => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      this.animationService.animateCounter(el, target, 1.8);
    });

    // Stagger stat cards
    const cards = this.el.nativeElement.querySelectorAll('.stat-card');
    if (cards.length) this.animationService.revealStagger(Array.from(cards), 0.1);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
