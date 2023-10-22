import { IsNotEmpty } from 'class-validator';

export class PaymentDto {
    orderId: string;
    amount: number;
    paymentKey?: string;

}