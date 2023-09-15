import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router)
  const token = localStorage.getItem('token');
  if (token === '' || token === null) {
    _router.navigate(['/login'])
  }
  return true;
};
