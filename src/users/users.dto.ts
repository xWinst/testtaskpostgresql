import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: "Developer", description: "User nickname" })
    username: string;

    @ApiProperty({ example: "user@gmail.com", description: "User email" })
    email: string;

    @ApiProperty({ example: "Oleg", description: "User name" })
    firstName: string;

    @ApiProperty({ example: "Chuchin", description: "User surname" })
    lastName: string;

    @ApiProperty({
        example: "male",
        description: "User's gender",
        enum: ["male", "female"],
    })
    state: string;

    @ApiProperty({
        example: "admin",
        description: "User role",
        enum: ["admin", "moderator", "user"],
    })
    role: string;
}

export class UpdateUserDto {
    @ApiProperty({ example: "Developer", description: "User nickname" })
    username?: string;

    @ApiProperty({ example: "user@gmail.com", description: "User email" })
    email?: string;

    @ApiProperty({ example: "Oleg", description: "User name" })
    firstName?: string;

    @ApiProperty({ example: "Chuchin", description: "User surname" })
    lastName?: string;

    @ApiProperty({
        example: "male",
        description: "User gender",
        enum: ["male", "female"],
    })
    state?: string;

    @ApiProperty({
        example: "admin",
        description: "User role",
        enum: ["admin", "moderator", "user"],
    })
    role?: string;
}
