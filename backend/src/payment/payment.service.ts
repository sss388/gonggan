import { Injectable } from '@nestjs/common';
import {PaymentDto} from "./dto/payment.dto";
import axios from "axios";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class PaymentService {
    constructor(private prisma: PrismaService) {}

    tossUrl = 'https://api.tosspayments.com/v1/payments/';

    // 결제 정보를 MySQL DB에 삽입하는 메서드 추가
    async insertPaymentInfo(paymentDto: PaymentDto) {
        // try {
        //     // paymentDto를 바탕으로 MySQL DB에 삽입
        //     const insertedInfo = await t({
        //         data: {
        //             paymentKey: paymentDto.paymentKey,
        //             orderId: paymentDto.orderId,
        //             amount: paymentDto.amount,
        //             // 다른 필요한 결제 정보를 여기에 추가하세요.
        //         },
        //     });
        //
        //     return insertedInfo;
        // } catch (error) {
        //     throw new Error('결제 정보를 삽입하는 중 오류가 발생했습니다.');
        // }
    }
    async successPay(paymentDto: PaymentDto) {
        console.log('payquerydto', paymentDto);
        const { orderId, amount, paymentKey } = paymentDto;
        try {
            const pay = await axios.post(
                this.tossUrl + paymentKey,
                {
                    orderId: orderId,
                    amount: amount,
                },
                {
                    headers: {
                        Authorization:
                            'Basic ' +
                            Buffer.from(process.env.TOSS_TEST_KEY + ':').toString('base64'),
                        'Content-Type': 'application/json',
                    },
                },
            );

            // 결제가 성공하면 결제 정보를 MySQL DB에 삽입
            const paymentInfo = {
                paymentKey: paymentDto.paymentKey, // paymentKey 추가
                orderId: orderId,
                amount: amount,
                // 다른 필요한 결제 정보를 여기에 추가하세요.
            };

            const insertedInfo = await this.insertPaymentInfo(paymentInfo);

            console.log('pay', pay);
            return {
                title: '성공적으로 구매했습니다',
                // amount: response.body.totalAmount,
                // 삽입 성공 시 적절한 응답 반환
                insertedInfo: insertedInfo,
            };
        } catch (e) {
            console.log('토스 페이먼츠 에러 코드', e);
        }
    }
}