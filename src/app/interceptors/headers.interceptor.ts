import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      let language = localStorage.getItem('language') as string;
    
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.append('X-RapidAPI-Key','75af2fb633mshf6f31c3d9aaa9c1p150c60jsn1a703763d7bc')
      .append('X-RapidAPI-Host', 'one-piece-episodes.p.rapidapi.com'),
      params: req.params.append('language',language)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}