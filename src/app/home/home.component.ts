import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div class="card">
      <h2>สวัสดี {{ username }}</h2>
      <p>ยินดีต้อนรับเข้าสู่ระบบ</p>
      <button (click)="logout()">ออกจากระบบ</button>
    </div>
  `,
  styles: [`
    .card { width: 320px; margin: 100px auto; padding: 24px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; }
    h2 { margin-bottom: 8px; }
    button { width: 100%; margin-top: 16px; padding: 10px; background: #d32f2f; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
  `],
})
export class HomeComponent {
  username: string;

  constructor(private auth: AuthService, private router: Router) {
    this.username = this.auth.getUsername();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}