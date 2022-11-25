import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  contentType: string | null | any;
  constructor(public route: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers.has('Content-Type')) {
        console.log('entramos')
      this.contentType = request.headers.get('Content-Type');
    }
    // add authorization header with jwt token if available
    const currentUser = JSON.parse(localStorage.getItem('user_autos_motos') || '{}');
    const token = localStorage.getItem('token_autos_motos');
    if (currentUser && token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          // console.log(event);
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            // console.log(err);
            // do error handling here
            if (err.status === 401) {
              if (err.message === 'Unauthenticated') {
                this.route.navigate(['/login']);
              }
            }
            if (err.status === 401) {
              localStorage.clear();
              this.route.navigate(['/login']);
            }
          }
        },
        () => {
          // console.log('complete');
        }
      )
    );
  }
}
