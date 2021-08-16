import { Pipe, PipeTransform } from '@angular/core';

// TODO: Пока не используется.
// Форматирует дату.
@Pipe({
    name: 'format'
})
export class FormatPipe implements PipeTransform {
    transform(date: any, format: string = "yyyy-MM-ddThh:mm"): any {
        // if (!date) {
        //     return;
        // }

        // return date;
    };
}