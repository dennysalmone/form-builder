import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'customTemperature'})
export class CustomTemperaturePipe implements PipeTransform {
    transform(value: number, unit: string): string | undefined {
        if(!value && isNaN(value)) return;

        if (unit === 'C') {
            const temp = (value - 32) / 1.8 ;
            return temp.toFixed(2) + 'C';
        } 
        if (unit === 'F'){
           const temp = (value * 1.8 ) + 32
           return temp.toFixed(2) + 'F';
        }

        return;
    }
}
