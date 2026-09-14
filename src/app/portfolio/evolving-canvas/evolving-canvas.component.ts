import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-evolving-canvas',
  templateUrl: './evolving-canvas.component.html',
  styleUrls: ['./evolving-canvas.component.css']
})
export class EvolvingCanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  public scrollProgress: number = 0;

  private ctx: CanvasRenderingContext2D | null = null;
  private animId: number = 0;
  private width: number = 0;
  private height: number = 0;
  private themeSub!: Subscription;
  private isDark: boolean = true;

  // Damped smooth coordinates
  private scrollEased: number = 0;
  private mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
  private time: number = 0;

  constructor(
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeSub = this.themeService.theme$.subscribe(theme => {
      this.isDark = theme === 'dark';
    });
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.handleResize();
    this.startRenderLoop();
  }

  ngOnDestroy(): void {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
    }
    if (this.themeSub) {
      this.themeSub.unsubscribe();
    }
  }

  @HostListener('window:resize')
  handleResize(): void {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    const dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = this.width * dpr;
    canvas.height = this.height * dpr;
    if (this.ctx) {
      this.ctx.scale(dpr, dpr);
    }
  }

  @HostListener('window:scroll')
  handleScroll(): void {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total > 0) {
      this.scrollProgress = Math.min(1, Math.max(0, window.pageYOffset / total));
    }
  }

  @HostListener('window:mousemove', ['$event'])
  handleMouseMove(e: MouseEvent): void {
    this.mouse.targetX = e.clientX;
    this.mouse.targetY = e.clientY;
  }

  private startRenderLoop(): void {
    const render = () => {
      this.time += 0.015;

      // Smooth inertia easing
      this.scrollEased += (this.scrollProgress - this.scrollEased) * 0.075;
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.055;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.055;

      this.drawCanvas();

      this.animId = requestAnimationFrame(render);
    };

    render();
  }

  private drawCanvas(): void {
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, this.width, this.height);

    // Color tokens matching Tier-1 palette
    const greenRgb = this.isDark ? '0, 229, 153' : '4, 120, 87';
    const cyanRgb = this.isDark ? '56, 189, 248' : '37, 99, 235';
    const dotAlpha = this.isDark ? 0.055 : 0.08;
    const crossAlpha = this.isDark ? 0.12 : 0.16;

    // 1. Sleek Architectural Dot Matrix & Hairline Crosshairs (Engineering Precision)
    this.drawArchitecturalGrid(ctx, greenRgb, dotAlpha, crossAlpha);

    // 2. Deep Atmospheric Ambient Glows (Smooth, Organic, Non-Distracting)
    this.drawAtmosphericAura(ctx, greenRgb, cyanRgb);

    // 3. Subtle Interactive Ambient Spotlight (Follows mouse smoothly)
    this.drawInteractiveSpotlight(ctx, greenRgb);
  }

  // ── Precision Engineering Dot Matrix ──
  private drawArchitecturalGrid(
    ctx: CanvasRenderingContext2D, 
    greenRgb: string, 
    dotAlpha: number, 
    crossAlpha: number
  ): void {
    ctx.save();
    const spacing = 48;
    const dotRadius = 1;

    // Faint precision dots
    ctx.fillStyle = `rgba(${this.isDark ? '255, 255, 255' : '0, 0, 0'}, ${dotAlpha})`;
    for (let x = spacing; x < this.width; x += spacing) {
      for (let y = spacing; y < this.height; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Precise Hairline Crosshair Markers at 192px intervals
    ctx.strokeStyle = `rgba(${greenRgb}, ${crossAlpha})`;
    ctx.lineWidth = 0.8;
    const crossSpacing = 192;
    const crossSize = 3;

    ctx.beginPath();
    for (let x = crossSpacing; x < this.width; x += crossSpacing) {
      for (let y = crossSpacing; y < this.height; y += crossSpacing) {
        ctx.moveTo(x - crossSize, y);
        ctx.lineTo(x + crossSize, y);
        ctx.moveTo(x, y - crossSize);
        ctx.lineTo(x, y + crossSize);
      }
    }
    ctx.stroke();

    ctx.restore();
  }

  // ── Deep Atmospheric Ambient Glow (Gentle, Restrained, Luxury Product Feel) ──
  private drawAtmosphericAura(ctx: CanvasRenderingContext2D, greenRgb: string, cyanRgb: string): void {
    ctx.save();

    const p = this.scrollEased;
    
    // Top-right emerald ambient bloom
    const x1 = this.width * 0.75 + Math.sin(this.time * 0.25) * 60;
    const y1 = this.height * 0.2 + Math.cos(this.time * 0.2) * 40 - (p * 80);
    const r1 = Math.min(this.width * 0.45, 520);
    const grad1 = ctx.createRadialGradient(x1, y1, 10, x1, y1, r1);
    grad1.addColorStop(0, `rgba(${greenRgb}, ${this.isDark ? 0.08 : 0.12})`);
    grad1.addColorStop(0.5, `rgba(${cyanRgb}, ${this.isDark ? 0.03 : 0.06})`);
    grad1.addColorStop(1, 'transparent');

    ctx.fillStyle = grad1;
    ctx.beginPath();
    ctx.arc(x1, y1, r1, 0, Math.PI * 2);
    ctx.fill();

    // Center-left subtle cyan bloom
    const x2 = this.width * 0.25 + Math.cos(this.time * 0.2) * 50;
    const y2 = this.height * 0.65 + Math.sin(this.time * 0.22) * 50 - (p * 60);
    const r2 = Math.min(this.width * 0.4, 480);
    const grad2 = ctx.createRadialGradient(x2, y2, 10, x2, y2, r2);
    grad2.addColorStop(0, `rgba(${cyanRgb}, ${this.isDark ? 0.06 : 0.10})`);
    grad2.addColorStop(0.55, `rgba(${greenRgb}, ${this.isDark ? 0.02 : 0.05})`);
    grad2.addColorStop(1, 'transparent');

    ctx.fillStyle = grad2;
    ctx.beginPath();
    ctx.arc(x2, y2, r2, 0, Math.PI * 2);
    ctx.fill();

    // Bottom atmospheric grounding glow
    const x3 = this.width * 0.5 + Math.sin(this.time * 0.15) * 40;
    const y3 = this.height * 0.9 + Math.cos(this.time * 0.18) * 30;
    const r3 = Math.min(this.width * 0.5, 600);
    const grad3 = ctx.createRadialGradient(x3, y3, 10, x3, y3, r3);
    grad3.addColorStop(0, `rgba(${greenRgb}, ${this.isDark ? 0.05 : 0.08})`);
    grad3.addColorStop(1, 'transparent');

    ctx.fillStyle = grad3;
    ctx.beginPath();
    ctx.arc(x3, y3, r3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // ── Subtle Interactive Cursor Spotlight (Damped Ambient Glow) ──
  private drawInteractiveSpotlight(ctx: CanvasRenderingContext2D, greenRgb: string): void {
    if (this.mouse.x < 0 || this.mouse.y < 0) return;

    ctx.save();
    const spotlightRadius = Math.min(this.width * 0.35, 360);
    const mouseGrad = ctx.createRadialGradient(
      this.mouse.x, this.mouse.y, 10,
      this.mouse.x, this.mouse.y, spotlightRadius
    );
    mouseGrad.addColorStop(0, `rgba(${greenRgb}, ${this.isDark ? 0.065 : 0.10})`);
    mouseGrad.addColorStop(0.5, `rgba(${greenRgb}, ${this.isDark ? 0.02 : 0.04})`);
    mouseGrad.addColorStop(1, 'transparent');

    ctx.fillStyle = mouseGrad;
    ctx.beginPath();
    ctx.arc(this.mouse.x, this.mouse.y, spotlightRadius, 0, Math.PI * 2);
  }
}


