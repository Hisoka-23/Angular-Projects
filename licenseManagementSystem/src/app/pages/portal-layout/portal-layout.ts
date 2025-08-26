import { Component } from '@angular/core';
import { Header } from './header/header/header';
import { Sidebar } from './sidebar/sidebar/sidebar';
import { Dashboard } from '../main/dashboard/dashboard';

@Component({
  selector: 'app-portal-layout',
  standalone: true,
  imports: [Header, Sidebar, Dashboard],
  template: `<app-header></app-header>, <app-sidebar></app-sidebar>, <app-dashboard></app-dashboard>`,
  styleUrl: './portal-layout.css'
})
export class PortalLayout {

}
