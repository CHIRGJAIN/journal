import { Module } from '@nestjs/common';
import { ManuscriptsService } from './manuscripts.service';
import { ManuscriptsController } from './manuscripts.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ManuscriptsController],
    providers: [ManuscriptsService],
})
export class ManuscriptsModule { }
