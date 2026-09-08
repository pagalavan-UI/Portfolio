import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('heroCanvas') heroCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('portraitFrame') portraitFrameRef!: ElementRef<HTMLElement>;

  private animationFrameId: number = 0;
  private mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
  private nodes: Array<{
    originX: number;
    originY: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
  }> = [];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initWaveCanvas();
    this.initPortraitTilt();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.mouse.targetX = e.clientX;
    this.mouse.targetY = e.clientY;
  }

  private initWaveCanvas(): void {
    const canvas = this.heroCanvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.initNodes(canvas.width, canvas.height);
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    const render = () => {
      // Ease mouse coordinates for liquid inertia
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const radius = 180;
      const spring = 0.04;
      const friction = 0.88;

      // Update node physics
      for (const node of this.nodes) {
        const dx = this.mouse.x - node.x;
        const dy = this.mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius && dist > 0) {
          const force = (1 - dist / radius) * -28;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }

        // Return to anchor point
        node.vx += (node.originX - node.x) * spring;
        node.vy += (node.originY - node.y) * spring;
        node.vx *= friction;
        node.vy *= friction;
        node.x += node.vx;
        node.y += node.vy;

        // Draw minimal node dot
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(node.x, node.y, 1.5, 1.5);
      }

      // Draw faint connections between neighboring nodes
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 0.6;

      const cols = Math.floor(canvas.width / 50) + 1;
      for (let i = 0; i < this.nodes.length; i++) {
        // Connect to right neighbor
        if ((i + 1) % cols !== 0 && i + 1 < this.nodes.length) {
          ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
          ctx.lineTo(this.nodes[i + 1].x, this.nodes[i + 1].y);
        }
        // Connect to bottom neighbor
        if (i + cols < this.nodes.length) {
          ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
          ctx.lineTo(this.nodes[i + cols].x, this.nodes[i + cols].y);
        }
      }
      ctx.stroke();

      this.animationFrameId = requestAnimationFrame(render);
    };

    render();
  }

  private initNodes(width: number, height: number): void {
    this.nodes = [];
    const spacing = 50;
    for (let y = 0; y < height; y += spacing) {
      for (let x = 0; x < width; x += spacing) {
        this.nodes.push({
          originX: x,
          originY: y,
          x: x,
          y: y,
          vx: 0,
          vy: 0
        });
      }
    }
  }

  private initPortraitTilt(): void {
    const frame = this.portraitFrameRef?.nativeElement;
    if (!frame) return;

    frame.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = frame.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      frame.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(10px)`;
    });

    frame.addEventListener('mouseleave', () => {
      frame.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    });
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
