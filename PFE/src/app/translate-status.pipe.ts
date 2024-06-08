import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateStatus'
})
export class TranslateStatusPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'nouveau':
        return 'Nouveau';
      case 'planifie':
        return 'Planifié';
      case 'en_cours':
        return 'En cours';
      case 'Annuler':
        return 'Annulé';
      case 'resolu':
        return 'Résolu';
      case 'cloture':
        return 'Clôturé';
      default:
        return value;
    }
  }
}
