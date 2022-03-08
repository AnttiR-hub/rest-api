import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AccService } from './acc.service';
import { CreateAccDto } from '../dto/create-acc.dto';
import { UpdateAccDto } from '../dto/update-acc.dto';



@Controller('accs')
export class AccController {
  constructor(private readonly service: AccService) {}


  // localhost:3000/accs
  @Get()
  findAll() {
    return this.service.findAll();
  }
  // localhost:3000/accs/id
  @Get(':id') 
  find(@Param('id') id:string) {
    return this.service.findOne(id);
    }
  
  //localhost:3000/accs
   //Uusi account requestin bodyyn JSON-muodossa
  @Post()
  create(@Body() createAccDto: CreateAccDto) {
    return this.service.create(createAccDto);
  }
 // localhost:3000/accs/id
 // Postmanissa bodyyn muokattavat tiedot JSONina
  @Put(':id')
  update(@Param('id') id:string, @Body() updateAccDto: UpdateAccDto) {
    return this.service.update(id, updateAccDto);
  }

  @Delete(':id')
  delete(@Param('id') id:string) {
    return this.service.delete(id);
    }
}
