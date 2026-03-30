import { Component, signal } from '@angular/core';
import { ElderlyCoupleIcon } from '../../icons/elderly-couple.icon';
import { PersonIcon } from '../../icons/person.icon';
import { PregnantIcon } from '../../icons/pregnant.icon';
import { WheelChairIcon } from '../../icons/wheel-chair.icon';

@Component({
  selector: 'app-kiosk-page',
  imports: [ElderlyCoupleIcon, PersonIcon, PregnantIcon, WheelChairIcon],
  templateUrl: './kiosk-page.html',
})
export class KioskPage {
  protected readonly isTicketModalOpen = signal(false);
  protected readonly ticketNumber = signal<string | null>(null);

  public getTicketNumber(prefix: 'A' | 'P') {
    this.ticketNumber.set(`${prefix}-001`);

    this.isTicketModalOpen.set(true);
  }

  protected closeTicketModal(): void {
    this.isTicketModalOpen.set(false);
    this.ticketNumber.set(null);
  }
}
