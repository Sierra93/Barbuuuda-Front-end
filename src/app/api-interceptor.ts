import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";

// Класс перехватчика api-запросов.
@Injectable()
export class ParamInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // req.headers.append("Content-Type", "application/json");
        // req.headers.append("Authorization", "Bearer ".concat(sessionStorage["userToken"]));

        const paramReq = req.clone({
            headers: req.headers.set(
                // "Content-Type", "application/json",
                "Authorization", "Bearer ".concat(sessionStorage["userToken"])
            )
        });

        return next.handle(paramReq);
    }
}