import { Module } from '@nestjs/common';
import { AccService } from './acc.service';
import { AccController } from './acc.controller';
import { MongooseModule } from '@nestjs/mongoose';
//Otetaan luotu pankkitilischema käyttöön
import { Acc, AccSchema } from '../schemas/acc.schema';

@Module({
  providers: [AccService],
  controllers: [AccController],
  imports: [
    MongooseModule.forFeature([{ name: Acc.name, schema: AccSchema }]),
  ],
})
export class AccModule {}
