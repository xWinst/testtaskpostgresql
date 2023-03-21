import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto, UpdateUserDto } from "./users.dto";
import { User } from "./users.model";
import { Profile } from "profiles/profiles.model";

const attributes = { exclude: ["createdAt", "updatedAt"] };

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(Profile) private profileModel: typeof Profile
    ) {}

    async createUser(userDto: CreateUserDto): Promise<User> {
        const { firstName, lastName, state } = userDto;
        const profileDto = { firstName, lastName, state };

        try {
            const result = await this.userModel.sequelize.transaction(
                async (transaction) => {
                    const user = await this.userModel.create(userDto, {
                        include: { model: this.profileModel, attributes },
                        transaction,
                    });

                    const profile = await this.profileModel.create(profileDto, {
                        transaction,
                    });

                    await user.$set("profile", profile.id, { transaction });

                    return user;
                }
            );
            return result.reload();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userModel.findAll({
            include: { model: Profile, attributes },
            attributes,
        });
        return users;
    }

    async getUsersByRole(role: any): Promise<User[]> {
        try {
            const users = await this.userModel.findAll({
                where: { role },
                include: { model: Profile, attributes },
                attributes,
            });

            return users;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async updateUserById(id: number, userDto: UpdateUserDto): Promise<User> {
        let user = await this.findUserById(id);
        const { username, email, firstName, lastName, state, role } = userDto;
        try {
            const result = await this.userModel.sequelize.transaction(
                async (transaction) => {
                    if (username || email || role) {
                        await this.userModel.update(
                            { username, email, role },
                            { where: { id }, transaction }
                        );
                    }

                    if (firstName || lastName || state) {
                        await this.profileModel.update(
                            { firstName, lastName, state },
                            { where: { id: user.profileId }, transaction }
                        );
                    }

                    user = await this.userModel.findByPk(id, {
                        include: { model: Profile, attributes },
                        attributes,
                    });

                    return user;
                }
            );

            return result;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async removeUserById(id: number): Promise<string> {
        const user = await this.findUserById(id);
        try {
            await User.destroy({ where: { id } });
            await Profile.destroy({ where: { id: user.profileId } });

            return `User with id=${id} has been deleted.`;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findUserById(id: number): Promise<User> {
        const user = await this.userModel.findByPk(id);

        if (!user) {
            throw new HttpException(
                `User with id=${id} not found`,
                HttpStatus.NOT_FOUND
            );
        }
        return user;
    }
}
