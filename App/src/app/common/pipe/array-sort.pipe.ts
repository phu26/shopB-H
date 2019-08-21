import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: "OrderASC",
    pure: false
  })
  export class ArraySortPipe  implements PipeTransform {
    

    transform(array: any, field: string): any[] {

           setTimeout(() => {
       
            if (!Array.isArray(array)) {
                return;
              }
            
              array.sort((a: any, b: any) => {
                if (a[field] < b[field]) {
                  return -1;
                } else if (a[field] > b[field]) {
                  return 1;
                } else {
                  return 0;
                }
              });
              
             

           }, 5000);
           return array;
    
    };

    
  }