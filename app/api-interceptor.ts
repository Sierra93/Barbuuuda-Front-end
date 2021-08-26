import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";

// Класс перехватчика api-запросов.
@Injectable()
export class ParamInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const paramReq = req.clone({
            headers: req.headers.set(
                // "Content-Type", "application/json",
                "Authorization", "Bearer ".concat(sessionStorage["userToken"])
            ),
            
            // Если нужно отправлять куки с каждым запросом.
            withCredentials: true
        });        

        return next.handle(paramReq);
    }
}