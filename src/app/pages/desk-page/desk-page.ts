import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface RecentTicket {
  id: string;
  category: 'normal' | 'priority';
}

@Component({
  selector: 'app-desk-page',
  imports: [RouterModule],
  templateUrl: './desk-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeskPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly deskId = computed(() => {
    const routeDeskNumber = this.route.snapshot.paramMap.get('deskNumber') ?? '1';
    const parsedDeskNumber = +routeDeskNumber;
    return Number.isFinite(parsedDeskNumber) && parsedDeskNumber > 0 ? parsedDeskNumber : 1;
  });

  protected readonly queueCount = signal(0);
  protected readonly currentTicketId = signal<string | null>('A-001'); // null
  protected readonly recentTickets = signal<RecentTicket[]>([
    // { id: 'A-001', category: 'normal' },
    // { id: 'A-002', category: 'priority' },
    // { id: 'A-003', category: 'normal' },
    // { id: 'A-004', category: 'priority' },
    // { id: 'A-005', category: 'normal' },
    // { id: 'A-006', category: 'priority' },
  ]);

  protected readonly canTakeNextTicket = computed(() => this.queueCount() > 0);
  protected readonly canFinishAttention = computed(() => this.currentTicketId() !== null);
}
