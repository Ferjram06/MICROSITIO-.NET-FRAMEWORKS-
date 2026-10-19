
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { createRoot, Root } from 'react-dom/client';
import { ReactWidget } from './react-widget';
import { createElement } from 'react';

@Component({
  selector: 'app-react-panel',
  standalone: true,
  template: '<div #reactContainer></div>',
})
export class ReactPanel implements AfterViewInit, OnDestroy {
  @ViewChild('reactContainer', { static: true })
  private container!: ElementRef<HTMLDivElement>;

  private root!: Root;

  ngAfterViewInit(): void {
    this.root = createRoot(this.container.nativeElement);
    this.root.render(createElement(ReactWidget));
  }

  ngOnDestroy(): void {
    this.root?.unmount();
  }
}
