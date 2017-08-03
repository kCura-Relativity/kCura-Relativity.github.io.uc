import { trigger, state, animate, transition, style } from '@angular/animations';

export const pinRoot = trigger('pinRoot', [
    state('1', style({ transform: 'translateX(330px)', width: 'calc(100% - 330px)' })),
    state('0', style({ transform: 'translateX(0)', width: '*' })),
    transition('void => *', animate('0s')),
    transition('* => *', animate('.6s cubic-bezier(0.19, 1, 0.22, 1)'))
]);