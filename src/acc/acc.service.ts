import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccDto } from '../dto/create-acc.dto';
import { UpdateAccDto } from '../dto/update-acc.dto';
import { Acc, AccDocument } from '../schemas/acc.schema';

@Injectable()
export class AccService {
  constructor(@InjectModel(Acc.name) private readonly model: Model<AccDocument>) {}

  findAll() {
    return this.model.find();
  }

  findOne(id:string) {
    return this.model.findById(id);
  }

  create(createAccDto: CreateAccDto) {
    return new this.model({
      ...createAccDto
    }).save();
  }

  update(id: string, updateAccDto:UpdateAccDto) {
    return this.model.findByIdAndUpdate(id, updateAccDto);
  }

  delete(id:string) {
    return this.model.findByIdAndRemove(id);
  }
}


