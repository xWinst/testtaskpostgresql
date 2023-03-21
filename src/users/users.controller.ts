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
import {
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
    ApiBody,
    ApiParam,
} from "@nestjs/swagger/dist";
import { User } from "./users.model";

@ApiTags("users")
@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: "User creation" })
    @ApiResponse({ status: 201, type: User })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({ summary: "Get all users" })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: "Get users by role" })
    @ApiQuery({ name: "role", enum: ["admin", "moderator", "user"] })
    @ApiResponse({ status: 200, type: [User] })
    @Get("/role")
    getAllByRole(@Req() req: Request) {
        return this.usersService.getUsersByRole(req.query.role);
    }

    @ApiOperation({ summary: "Update user by ID" })
    @ApiParam({ name: "id", description: "Must be a number" })
    @ApiBody({ type: [UpdateUserDto] })
    @ApiResponse({ status: 200, type: User })
    @Patch(":id")
    updateUser(@Param("id") id: string, @Body() userDto: UpdateUserDto) {
        return this.usersService.updateUserById(Number(id), userDto);
    }

    @ApiOperation({ summary: "Delete user by ID" })
    @ApiParam({ name: "id", description: "Must be a number" })
    @Delete(":id")
    @ApiResponse({ status: 200, description: "User has been deleted." })
    removeUser(@Param("id") id: string) {
        return this.usersService.removeUserById(Number(id));
    }
}
