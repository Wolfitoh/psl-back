import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { Auth } from 'src/modules/auth/decorators';
import { ValidRoles } from 'src/modules/auth/interfaces/valid-roles';
import { CreateUserDto, SearchUserByUDto, UpdateUserDto } from '../../dto';
import { UserService } from '../../services/user/user.service';
import { HttpStatus } from '@nestjs/common';
import { Usuario } from '../../entities/usuario.entity';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @Auth(ValidRoles.Administrador)
    getUsers(): Promise<Usuario[]> {
        return this.userService.getUsers();
    }

    //No exponer esta API
    @Get('getuser')
    // @Auth(ValidRoles.Administrador)
    getUser(@Body() SearchUserByUDto: SearchUserByUDto): Promise<Usuario> {
        return this.userService.getUser(SearchUserByUDto);
    }

    @Post()
    @Auth(ValidRoles.Administrador)
    createUser(@Body() createUser: CreateUserDto): Promise<Usuario> {
        return this.userService.createUser(createUser);
    }

    @Delete(':uuid')
    @Auth(ValidRoles.Administrador)
    deleteUser(@Param('uuid', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE, })) uid: string): Promise<Object> {
        return this.userService.deleteUser(uid);
    }

    @Patch()
    @Auth(ValidRoles.Administrador)
    updateUser(@Body() vaccine: UpdateUserDto): Promise<Usuario> {
        return this.userService.updateUser(vaccine);
    }
}
