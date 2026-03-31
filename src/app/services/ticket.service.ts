import { computed, inject, Injectable, OnDestroy, signal } from '@angular/core';
import { WebSocketService } from '../web-sockets/services/websocket.service';
import { QueueMessageState } from '../web-sockets/types';
import { Ticket } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TicketService implements OnDestroy {
  private readonly websocketService = inject(WebSocketService);
  private ticketState = signal<QueueMessageState | null>(null);

  readonly queueCount = computed(() => this.ticketState()?.pendingTotal.combined || 0);
  readonly activeByDesk = computed(() => this.ticketState()?.activeByDesk || {});
  readonly recentTickets = computed<Ticket[]>(() => this.ticketState()?.recentlyServed || []);

  private onMessage$ = this.websocketService.onMessage.subscribe((message) => {
    switch (message.type) {
      case 'QUEUE_STATE':
        this.ticketState.set(message.payload.state);
        break;
    }
  });

  ngOnDestroy(): void {
    this.onMessage$.unsubscribe();
  }
}
