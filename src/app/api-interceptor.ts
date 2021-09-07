import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { throwError } from "rxjs";
import { CommonDataService } from "./services/common-data.service";

// Класс перехватчика api-запросов.
@Injectable()
export class ParamInterceptor implements HttpInterceptor {
    constructor(private commonService: CommonDataService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        req = req.clone({
            headers: req.headers.set(
                // "Content-Type", "application/json",
                "Authorization", "Bearer ".concat(sessionStorage["userToken"])
            ),

            // Если нужно отправлять куки с каждым запросом.
            withCredentials: true
        });

        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

        return next.handle(req).pipe(
            catchError(err => {
                this.commonService.routeToStart(err);

                return throwError(err.message);
            }));
    }
}