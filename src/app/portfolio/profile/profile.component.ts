import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { AnimationService } from '../../services/animation.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('particlesCanvas') particlesCanvasRef!: ElementRef<HTMLCanvasElement>;

  private typedTextElement: HTMLElement | null = null;
  private currentTextIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private typingTimer: any;
  private animationFrameId: number = 0;

  private readonly TYPING_SPEED = 90;
  private readonly DELETE_SPEED = 50;
  private readonly PAUSE_DURATION = 2200;

  private readonly roles = [
    'MEAN Stack Developer',
    'Angular Specialist',
    'Full-Stack Engineer',
    'UI/UX Craftsman'
  ];

  // Particle system state
  private particles: Array<{
    x: number; y: number; vx: number; vy: number;
    r: number; alpha: number; color: string;
  }> = [];

  constructor(
    private animationService: AnimationService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initGsapAnimations();
    this.initTypingAnimation();
    this.initParticles();
    this.initMagneticButtons();
    this.initCounters();
  }

  ngOnDestroy(): void {
    clearTimeout(this.typingTimer);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }

  private initGsapAnimations(): void {
    const elements = this.el.nativeElement.querySelectorAll('.gsap-reveal');
    if (elements.length > 0) {
      gsap.fromTo(Array.from(elements),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.3 }
      );
    }

    // Magnetic buttons
    const btns = this.el.nativeElement.querySelectorAll('.magnetic-btn');
    btns.forEach((btn: HTMLElement) => this.animationService.magneticHover(btn));
  }

  private initCounters(): void {
    const counterEls = this.el.nativeElement.querySelectorAll('[data-target]');
    counterEls.forEach((el: HTMLElement) => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      this.animationService.animateCounter(el, target, 2);
    });
  }

  private initTypingAnimation(): void {
    this.typedTextElement = this.el.nativeElement.querySelector('.typed-text');
    if (this.typedTextElement) {
      this.typingTimer = setTimeout(() => this.typeWriter(), 1200);
    }
  }

  private typeWriter(): void {
    const currentText = this.roles[this.currentTextIndex];
    if (!this.typedTextElement) return;

    if (!this.isDeleting) {
      this.typedTextElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
      if (this.currentCharIndex === currentText.length) {
        this.typingTimer = setTimeout(() => {
          this.isDeleting = true;
          this.typeWriter();
        }, this.PAUSE_DURATION);
        return;
      }
    } else {
      this.typedTextElement.textContent = currentText.substring(0, this.currentCharIndex);
      this.currentCharIndex--;
      if (this.currentCharIndex < 0) {
        this.isDeleting = false;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.roles.length;
        this.typingTimer = setTimeout(() => this.typeWriter(), 400);
        return;
      }
    }
    this.typingTimer = setTimeout(
      () => this.typeWriter(),
      this.isDeleting ? this.DELETE_SPEED : this.TYPING_SPEED
    );
  }

  private initParticles(): void {
    const canvas = this.particlesCanvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = 70;
    const colors = ['rgba(0,255,204,', 'rgba(124,58,237,', 'rgba(56,189,248,'];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(this.particles[i].x, this.particles[i].y);
            ctx.lineTo(this.particles[j].x, this.particles[j].y);
            ctx.strokeStyle = `rgba(0,255,204,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      this.animationFrameId = requestAnimationFrame(draw);
    };
    draw();
  }

  private initMagneticButtons(): void {
    const btns = this.el.nativeElement.querySelectorAll('.magnetic-btn');
    btns.forEach((btn: HTMLElement) => this.animationService.magneticHover(btn));
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
