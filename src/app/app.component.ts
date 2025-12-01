import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AnimationService } from './services/animation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'projectK';
  isLoading = true;

  constructor(private animationService: AnimationService) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    // Simulate loading time
    setTimeout(() => {
      this.isLoading = false;
      // Initialize animations right after loading completes
      setTimeout(() => {
        this.initializeAnimations();
      }, 100);
    }, 2500); // Reduced loading time
  }

  private initializeAnimations(): void {
    try {
      console.log('Initializing GSAP animations...');
      this.animationService.initScrollAnimations();
      console.log('GSAP animations initialized successfully');

      // Verify sections are visible after animation initialization
      setTimeout(() => {
        this.verifySectionsVisibility();
      }, 500);

    } catch (error) {
      console.warn('GSAP animations failed to initialize:', error);
      // Fallback: ensure sections are visible
      this.ensureSectionsVisible();
    }
  }

  private verifySectionsVisibility(): void {
    const sections = ['.skills', '.projects'];
    sections.forEach(selector => {
      const element = document.querySelector(selector) as HTMLElement;
      if (element) {
        const computedStyle = window.getComputedStyle(element);
        console.log(`${selector} visibility:`, {
          opacity: computedStyle.opacity,
          display: computedStyle.display,
          visibility: computedStyle.visibility
        });
      }
    });
  }

  private ensureSectionsVisible(): void {
    // Fallback to ensure sections are visible if animations fail
    const sections = ['.skills', '.projects', '.skill-category', '.project-card'];
    sections.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element: any) => {
        element.style.opacity = '1';
        element.style.transform = 'none';
      });
    });
  }
}
