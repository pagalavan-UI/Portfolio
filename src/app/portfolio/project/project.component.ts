import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({ selector: 'app-project', templateUrl: './project.component.html', styleUrls: ['./project.component.css'] })
export class ProjectComponent implements OnDestroy {
  @ViewChild('projectDialog') projectDialog!: ElementRef<HTMLDialogElement>;
  readonly technologies = ['Angular', 'TypeScript', 'SCSS', 'GSAP', 'Bootstrap 5'];
  private previousOverflow: string | null = null;
  openProjectModal(_projectId: string): void {
    this.previousOverflow = document.body.style.overflow;
    this.projectDialog.nativeElement.showModal();
    document.body.style.overflow = 'hidden';
  }
  closeProjectModal(): void { this.projectDialog.nativeElement.close(); }
  onBackdropClick(event: MouseEvent): void {
    if (event.target !== this.projectDialog.nativeElement) return;
    const rect = this.projectDialog.nativeElement.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) this.closeProjectModal();
  }
  onDialogClose(): void {
    if (this.previousOverflow !== null) document.body.style.overflow = this.previousOverflow;
    this.previousOverflow = null;
  }
  ngOnDestroy(): void { this.onDialogClose(); }
}
