import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "payment",
    templateUrl: "./payment.component.html",
    styleUrls: ["./payment.component.scss"]
})

export class PaymentModule implements OnInit {
    oWidgetSettings: any = {};

    constructor(private http: HttpClient,
        private titleService: Title) { }

        public ngOnInit() {
            this.titleService.setTitle("Barbuuuda: Страница оплаты");
        };

    // TODO: возможно нужно будет вернуть после подключения реальной платежной системы.
    // public ngOnInit() {        
    //     this.loadScript('https://paymaster.ru/widget/widget.bundle.js').then(
    //   () => this.loadTextScript(`
    //   this.initWidget();
    //   setTimeout(() => {
    //     let widget = new PayMasterWidget();                    
    //     widget.mount('widget', this.oWidgetSettings);
    // }, 1000);
    //   `)
    // );

    // console.log("oWidgetSettings", this.oWidgetSettings);
    // };

    // public loadTextScript(text: string) {
    //     return new Promise(resolve => {
    //       const script = this.renderer2.createElement('script');
    //       script.text = text;
    //       this.renderer2.appendChild(this.document.body, script);
    //     //   resolve();
    //     });
    //   };

    // public loadScript(url: string) {
    //     return new Promise((resolve, reject) => {
    //         const script = this.renderer2.createElement('script');
    //         script.src = url;
    //         script.onload = resolve;
    //         script.onerror = reject;
    //         this.renderer2.appendChild(this.document.body, script);
    //     });
    // };

    // private async initWidget() {
    //     try {
    //         await this.http.post(API_URL.apiUrl.concat("/payment/init"), {Amount: 123})
    //             .subscribe({
    //                 next: (response: any) => {                        
    //                     this.oWidgetSettings = response;
    //                     console.log("oWidgetSettings", this.oWidgetSettings);
    //                 },

    //                 error: (err) => {
    //                     throw new Error(err);
    //                 }
    //             });
    //     }

    //     catch (e) {
    //         throw new Error(e);
    //     }
    // };
}