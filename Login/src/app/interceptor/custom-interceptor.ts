import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;

  const token = localStorage.getItem('angularToken');

  const clonedReq = req.clone({
    setHeaders:{
      Autorizations: `Bearer ${token}`
    }
  })

  return next(clonedReq);
};
