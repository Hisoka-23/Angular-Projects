import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderOption } from './header-option/header-option';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, HeaderOption],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  toggleSidebar() {
    document.body.classList.toggle('sidebar-collapse');
    document.body.classList.toggle('sidebar-open');
  }

}
