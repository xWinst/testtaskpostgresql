import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Profile } from "./profiles.model";
import { User } from "users/users.model";

@Module({
    imports: [SequelizeModule.forFeature([Profile, User])],
})
export class ProfilesModule {}
