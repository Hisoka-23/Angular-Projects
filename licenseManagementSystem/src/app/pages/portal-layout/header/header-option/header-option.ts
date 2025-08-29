import { Component, signal } from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-header-option',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header-option.html',
  styleUrl: './header-option.css'
})
export class HeaderOption {

  isMessages = signal<boolean>(false);

  isNotifications = signal<boolean>(false);

  isProfileOpen = signal<boolean>(false);

  setMessage(value?: boolean){
    this.isMessages.set(value ?? !this.isMessages());
  }

  setNotification(value?: boolean){
    this.isNotifications.set(value ?? !this.isNotifications());
  }

  setProfileOpen(value? : boolean){
    this.isProfileOpen.set(value ?? !this.isProfileOpen());
  }

  toggleNotificationDropdown(){
    this.setNotification();
    this.setMessage(false);
    this.setProfileOpen(false);
  }

  toggleMessageDropdown(){
    this.setMessage();
    this.setNotification(false);
    this.setProfileOpen(false);
  }

  toggleProfileDropdown(){
    this.setProfileOpen();
    this.setMessage(false);
    this.setNotification(false);
  }

  toggleFullScreen(event: Event){
    event.preventDefault();
    const doc: any = document;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      doc.exitFullscreen();
    }
  }

}
