import { Component } from '@angular/core';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { Footer } from './footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-portal-layout',
  standalone: true,
  imports: [Header, Sidebar, RouterOutlet, Footer],
  template: `
          <div class="app-wrapper bg-color">
            <app-header style="display: contents;"></app-header>
            <app-sidebar  style="display: contents;"></app-sidebar>

            <main class="app-main bg-color">
               <div class="app-content">
                 <router-outlet></router-outlet>
              </div> 
            </main>

            <app-footer style="display: contents;"></app-footer>
          </div>
          `,
  styleUrl: './portal-layout.css'
})
export class PortalLayout {


}
