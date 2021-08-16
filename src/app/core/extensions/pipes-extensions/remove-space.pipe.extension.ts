import { Pipe, PipeTransform } from '@angular/core';

// Уберет пробелы в строке.
@Pipe({
    name: 'removeSpace'
})
export class RemoveSpacePipe implements PipeTransform {
    transform(str: string): any {
        if (!str) {
            return;
        }

        return str = str.replace(/\s/g, "");
    };
}