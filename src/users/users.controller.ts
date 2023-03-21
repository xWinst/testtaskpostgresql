import {
    Controller,
    Body,
    Param,
    Post,
    Get,
    Patch,
    Delete,
    Req,
} from "@nestjs/common";
import { Request } from "express";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./users.dto";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @Get("/role")
    getAllByRole(@Req() req: Request) {
        return this.usersService.getUsersByRole(req.query.role);
    }

    @Patch(":id")
    updateUser(@Param("id") id: string, @Body() userDto: UpdateUserDto) {
        return this.usersService.updateUserById(Number(id), userDto);
    }

    @Delete(":id")
    removeUser(@Param("id") id: string) {
        return this.usersService.removeUserById(Number(id));
    }
}
