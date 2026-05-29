import { Injectable, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() {}

  /** Fade + slide up, staggered, on scroll */
  public revealStagger(elements: Element[], stagger: number = 0.12): void {
    if (!elements || elements.length === 0) return;
    gsap.fromTo(elements,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.9,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elements[0],
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  /** Fade + slide up a single element on scroll */
  public revealElement(element: HTMLElement, delay: number = 0): void {
    if (!element) return;
    gsap.fromTo(element,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  /** Fade + slide from left */
  public revealFromLeft(element: HTMLElement, delay: number = 0): void {
    if (!element) return;
    gsap.fromTo(element,
      { x: -60, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  /** Fade + slide from right */
  public revealFromRight(element: HTMLElement, delay: number = 0): void {
    if (!element) return;
    gsap.fromTo(element,
      { x: 60, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  /** Scale in from slightly small */
  public revealScale(element: HTMLElement, delay: number = 0): void {
    if (!element) return;
    gsap.fromTo(element,
      { scale: 0.88, opacity: 0 },
      {
        scale: 1, opacity: 1,
        duration: 0.8,
        delay,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  /**
   * Animated counter from 0 → target
   * Element must have data-target attribute
   */
  public animateCounter(element: HTMLElement, target: number, duration: number = 2): void {
    if (!element) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      },
      onUpdate: () => {
        element.textContent = Math.round(obj.val).toString();
      }
    });
  }

  /**
   * Animate skill progress bar width on scroll
   */
  public animateProgressBar(bar: HTMLElement, targetWidth: number): void {
    if (!bar) return;
    gsap.fromTo(bar,
      { width: '0%' },
      {
        width: `${targetWidth}%`,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }

  /**
   * Magnetic hover effect — element follows cursor slightly
   */
  public magneticHover(element: HTMLElement): void {
    if (!element) return;
    element.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(element, {
        x: x * 0.18,
        y: y * 0.18,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        x: 0, y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)'
      });
    });
  }

  /**
   * 3D tilt on mousemove
   */
  public tiltCard(element: HTMLElement): void {
    if (!element) return;
    element.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(element, {
        rotateY: x * 10,
        rotateX: -y * 10,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800
      });
    });
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        rotateY: 0, rotateX: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  }

  /**
   * Parallax scroll effect
   */
  public parallaxElement(element: HTMLElement, speed: number = 0.3): void {
    if (!element) return;
    gsap.to(element, {
      y: () => window.innerHeight * speed * -1,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  /**
   * Split-word text reveal
   */
  public animateText(element: HTMLElement): void {
    if (!element) return;
    const text = element.innerText;
    element.innerHTML = '';
    text.split(' ').forEach(word => {
      const span = document.createElement('span');
      span.innerText = word + '\u00A0';
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(24px)';
      element.appendChild(span);
    });
    gsap.to(element.children, {
      y: 0, opacity: 1,
      duration: 0.7,
      stagger: 0.06,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  /**
   * Header slide down on page load
   */
  public headerReveal(element: HTMLElement): void {
    if (!element) return;
    gsap.fromTo(element,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    );
  }

  /** Kill all ScrollTriggers (call on component destroy) */
  public killAll(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}
