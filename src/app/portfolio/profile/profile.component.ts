import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  private typedTextElement: HTMLElement | null = null;
  private cursorElement: HTMLElement | null = null;
  private currentTextIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private typingSpeed = 100;

  private roles = [
    'Frontend Developer',
    'UI/UX Designer',
    'Angular Expert',
    'Creative Coder'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeTypingAnimation();
  }

  private initializeTypingAnimation(): void {
    this.typedTextElement = document.querySelector('.typed-text');
    this.cursorElement = document.querySelector('.cursor-typed');

    if (this.typedTextElement && this.cursorElement) {
      setTimeout(() => {
        this.typeWriter();
      }, 1000);
    }
  }

  private typeWriter(): void {
    const currentText = this.roles[this.currentTextIndex];

    if (this.typedTextElement) {
      if (!this.isDeleting) {
        // Typing
        this.typedTextElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
        this.currentCharIndex++;

        if (this.currentCharIndex === currentText.length) {
          // Pause at end of word
          setTimeout(() => {
            this.isDeleting = true;
            this.typeWriter();
          }, 2000);
          return;
        }
      } else {
        // Deleting
        this.typedTextElement.textContent = currentText.substring(0, this.currentCharIndex);
        this.currentCharIndex--;

        if (this.currentCharIndex < 0) {
          this.isDeleting = false;
          this.currentTextIndex = (this.currentTextIndex + 1) % this.roles.length;
          setTimeout(() => this.typeWriter(), 500);
          return;
        }
      }

      setTimeout(() => this.typeWriter(), this.isDeleting ? this.typingSpeed / 2 : this.typingSpeed);
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
