import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-dev-grid',
  templateUrl: './dev-grid.component.html',
  styleUrls: ['./dev-grid.component.css']
})
export class DevGridComponent implements OnInit {
  public isActive: boolean = false;
  public columns = Array.from({ length: 12 }, (_, i) => i + 1);
  public viewportWidth: number = 0;
  public viewportHeight: number = 0;
  public currentBreakpoint: string = 'XL';

  ngOnInit(): void {
    this.updateViewportDimensions();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(e: KeyboardEvent): void {
    // Toggle when pressing 'g' or 'G' (unless typing in input/textarea)
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
      return;
    }

    if (e.key === 'g' || e.key === 'G') {
      this.isActive = !this.isActive;
    } else if (e.key === 'Escape' && this.isActive) {
      this.isActive = false;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateViewportDimensions();
  }

  private updateViewportDimensions(): void {
    if (typeof window === 'undefined') return;
    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;

    if (this.viewportWidth >= 1400) this.currentBreakpoint = 'XXL';
    else if (this.viewportWidth >= 1200) this.currentBreakpoint = 'XL';
    else if (this.viewportWidth >= 992) this.currentBreakpoint = 'LG';
    else if (this.viewportWidth >= 768) this.currentBreakpoint = 'MD';
    else if (this.viewportWidth >= 576) this.currentBreakpoint = 'SM';
    else this.currentBreakpoint = 'XS';
  }
}
