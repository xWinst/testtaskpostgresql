export class CreateUserDto {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    state: string;
    role: string;
}

export class UpdateUserDto {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    state?: string;
    role?: string;
}
