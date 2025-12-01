import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
  }

  initScrollAnimations(): void {
    this.initHeroAnimations();
    this.initSkillsAnimations();
    this.initProjectsAnimations();
    this.initFooterAnimations();
  }

  private initHeroAnimations(): void {
    // Hero section animations
    gsap.from('.hero-title', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.3
    });

    gsap.from('.hero-description', {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.6
    });

    gsap.from('.hero-actions', {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.9
    });

    gsap.from('.hero-stats', {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: 'power3.out',
      delay: 1.2
    });

    gsap.from('.hero-image', {
      duration: 1.2,
      x: 50,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.5
    });

    // Floating icons animation
    gsap.from('.floating-icons .icon', {
      duration: 0.8,
      scale: 0,
      opacity: 0,
      ease: 'back.out(1.7)',
      stagger: 0.1,
      delay: 1.5
    });
  }

  private initSkillsAnimations(): void {
    // Ensure skills section is visible initially
    gsap.set('.skill-category', { opacity: 1, y: 0 });
    gsap.set('.cloud-tag', { opacity: 1, scale: 1 });

    // Skills section scroll trigger - only animate if not already visible
    gsap.from('.skill-category', {
      scrollTrigger: {
        trigger: '.skills',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Progress bars animation - ensure they start from 0 width
    gsap.set('.skill-progress', { width: 0 });
    gsap.to('.skill-progress', {
      scrollTrigger: {
        trigger: '.skills',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      width: (index, target) => {
        // Get the width from the inline style or default to 85%
        const parent = target.parentElement?.parentElement;
        const percentage = parent?.querySelector('.skill-percentage')?.textContent?.replace('%', '') || '85';
        return percentage + '%';
      },
      duration: 1.5,
      ease: 'power2.out',
      stagger: 0.1
    });

    // Skills cloud animation
    gsap.from('.cloud-tag', {
      scrollTrigger: {
        trigger: '.skills-cloud',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: 'back.out(1.7)'
    });
  }

  private initProjectsAnimations(): void {
    // Ensure projects are visible initially
    gsap.set('.project-card', { opacity: 1, y: 0 });
    gsap.set('.project-actions', { opacity: 0, y: 20 });

    // Projects section scroll trigger - only animate if not already visible
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: '.projects',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Project actions hover effect - ensure proper initial state
    setTimeout(() => {
      document.querySelectorAll('.project-card').forEach(card => {
        const actions = card.querySelector('.project-actions') as HTMLElement;

        card.addEventListener('mouseenter', () => {
          gsap.to(actions, {
            duration: 0.3,
            opacity: 1,
            y: 0,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(actions, {
            duration: 0.3,
            opacity: 0,
            y: 20,
            ease: 'power2.out'
          });
        });
      });
    }, 100);
  }

  private initFooterAnimations(): void {
    // Footer scroll trigger
    gsap.from('.footer-brand', {
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.footer-links', {
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2
    });

    gsap.from('.footer-social', {
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.4
    });

    gsap.from('.footer-newsletter', {
      scrollTrigger: {
        trigger: '.footer-newsletter',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });
  }

  // Utility methods for custom animations
  animateElement(element: string, properties: any, options: any = {}): void {
    gsap.to(element, {
      ...properties,
      ...options
    });
  }

  animateFrom(element: string, properties: any, options: any = {}): void {
    gsap.from(element, {
      ...properties,
      ...options
    });
  }

  animateStagger(elements: string, properties: any, stagger: number = 0.1): void {
    gsap.from(elements, {
      ...properties,
      stagger: stagger
    });
  }

  createScrollTrigger(trigger: string, animation: any): void {
    ScrollTrigger.create({
      trigger: trigger,
      ...animation
    });
  }
}
