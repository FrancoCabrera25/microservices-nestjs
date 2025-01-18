import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {

    private readonly logger = new Logger("AuthSerice");

    onModuleInit() {
        this.$connect();
        this.logger.log('MongoDB connected');
    }

}
