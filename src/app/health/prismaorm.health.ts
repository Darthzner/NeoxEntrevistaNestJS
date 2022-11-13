import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class PrismaOrmHealthIndicator extends HealthIndicator {
    constructor(private readonly prismaService: PrismaService) {
        super();
    }

    async pingCheck(databaseName: string): Promise<any> {
        try {
            await this.prismaService.$queryRaw`SELECT 1`;
            return this.getStatus(databaseName, true);
        } catch (e) {
            throw new InternalServerErrorException('Prisma check failed', e);
        }
    }
}