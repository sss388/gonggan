import {Body, Controller, Post} from '@nestjs/common';
import {PaymentService} from "./payment.service";
import {PaymentDto} from "./dto/payment.dto";

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) {}

    /**토스 페이먼츠 api에 결제 요청하는 함수 */
    @Post('/success')
    successPay(@Body() PaymentDto: PaymentDto) {
        console.log(PaymentDto);
        return this.paymentService.successPay(PaymentDto);
    }
}
