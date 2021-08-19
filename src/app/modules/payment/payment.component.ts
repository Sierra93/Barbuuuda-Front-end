import { Component, DoCheck } from "@angular/core";

@Component({
    selector: "payment",
    templateUrl: "./payment.component.html",
    styleUrls: ["./payment.component.scss"]
})

export class PaymentModule implements DoCheck {
    oWidgetSettings: any = {};

    constructor() {}

    public ngDoCheck() {

    };
}