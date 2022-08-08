import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'customTemperature'})
export class CustomTemperaturePipe implements PipeTransform {
    transform(value: number, unit: string) {
        if(value && !isNaN(value)) {
            if (unit === 'C') {
               var temperature = (value - 32) /1.8 ;
               return temperature.toFixed(2)+ 'C';
            } 
            if (unit === 'F'){
               var temperature = (value * 1.8 ) + 32
               return temperature.toFixed(2) + 'F';
            }
        }
        return;
    }
}
