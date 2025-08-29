import { Component, input } from '@angular/core';
import { RouterLinkActive, RouterLink } from "@angular/router";

@Component({
  selector: 'app-content-header',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './content-header.html',
  styleUrl: './content-header.css'
})
export class ContentHeader {

  readonly title = input.required<string>();

  readonly subRoute = input.required<string>();

  readonly route = input<string>();

  readonly lastRoute = input<boolean>(false);

  readonly lastRouteName = input<string>();

}
