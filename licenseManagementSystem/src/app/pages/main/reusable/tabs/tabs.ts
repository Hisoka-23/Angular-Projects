import { NgClass, NgForOf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [NgForOf, NgClass],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css'
})
export class Tabs {

  @Input() tabsArray: {label:string; icon:string}[] = [];

  @Output() onTabChange = new EventEmitter<number>();

  activeatedTab:number = 0;

  constructor(){}

  setTab(index:number){
    this.activeatedTab = index;
    this.onTabChange.emit(index);
  }

}
