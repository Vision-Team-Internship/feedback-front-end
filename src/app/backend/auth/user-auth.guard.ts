import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuard implements CanActivate {
  constructor(private adminService: AdminService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isAuthorized = this.adminService.user.role.includes(route.data.role);
    if (!isAuthorized) {
      this.router.navigate(['/']);
    }
    return isAuthorized;
  }
}
