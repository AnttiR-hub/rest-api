import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { AccService } from './acc.service';
import { CreateAccDto } from '../dto/create-acc.dto';
import { UpdateAccDto } from '../dto/update-acc.dto';



@Controller('accs')
export class AccController {
  constructor(private readonly service: AccService) {}

  //Kaikki määritellyt CRUD-metodit ja endpointit ovat suojattuja käyttäen passport middlewarea ja tähän projektiin luotua jwt strategiaa
  //ja vaativat requestin kanssa tokenin rekisteröidyltä käyttäjältä

  // localhost:3000/accs
  @Get()
  @UseGuards(AuthGuard("jwt"))
  findAll() {
    return this.service.findAll();
  }
  // localhost:3000/accs/id
  @Get(':id') 
  @UseGuards(AuthGuard("jwt"))
  find(@Param('id') id:string) {
    return this.service.findOne(id);
    }
  
  //localhost:3000/accs
   //Uusi account requestin bodyyn JSON-muodossa
  @Post()
  @UseGuards(AuthGuard("jwt"))
  create(@Body() createAccDto: CreateAccDto) {
    return this.service.create(createAccDto);
  }
 // localhost:3000/accs/id
 // Postmanissa bodyyn muokattavat tiedot JSONina
  @Put(':id')
  @UseGuards(AuthGuard("jwt"))
  update(@Param('id') id:string, @Body() updateAccDto: UpdateAccDto) {
    return this.service.update(id, updateAccDto);
  }

  // localhost:3000/accs/id
  @Delete(':id')
  @UseGuards(AuthGuard("jwt"))
  delete(@Param('id') id:string) {
    return this.service.delete(id);
    }
}
