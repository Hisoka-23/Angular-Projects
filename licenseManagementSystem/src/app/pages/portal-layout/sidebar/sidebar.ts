import { MenuItem } from './../../../interface/menu-item.interface';
import { Component, signal } from '@angular/core';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { MENU_ITEMS } from '../../../constants/menu.constants';
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [OverlayscrollbarsModule, RouterLink, RouterLinkWithHref, NgClass, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  MenuItem = signal<MenuItem[]>(MENU_ITEMS);

  activeMenu = signal<string | null>(null);

  toggleMenu(label: string | undefined){
    this.activeMenu.set(this.activeMenu() === label ? null : label ?? '');
  }

}

