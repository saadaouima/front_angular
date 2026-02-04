import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <app-header></app-header>
        <div class="content-area">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      min-height: 100vh;
      background-color: var(--content-bg);
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 280px;
      transition: margin-left 0.3s ease;
    }

    .content-area {
      flex: 1;
      padding: 2rem;
      overflow-y: auto;
    }

    @media (max-width: 1024px) {
      .main-content {
        margin-left: 0;
      }
    }
  `]
})
export class AppComponent {
  title = 'HR Admin Dashboard';
}
