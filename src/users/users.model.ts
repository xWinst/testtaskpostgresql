import {
    Model,
    Table,
    Column,
    DataType,
    Sequelize,
    BelongsTo,
    ForeignKey,
    HasOne,
} from "sequelize-typescript";
import { Profile } from "profiles/profiles.model";
import { ApiProperty } from "@nestjs/swagger";

interface UserCreationAtrributes {
    username: string;
    email: string;
    role: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAtrributes> {
    @ApiProperty({ example: "12", description: "User ID" })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    })
    id: number;

    @ApiProperty({ example: "Developer", description: "User nickname" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    username: string;

    @ApiProperty({ example: "user@gmail.com", description: "User email" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({
        example: "admin",
        description: "User role",
        enum: ["admin", "moderator", "user"],
    })
    @Column({
        type: DataType.ENUM("admin", "moderator", "user"),
        allowNull: false,
    })
    role: string;

    @ApiProperty({
        example: "2023-03-21T14:37:32.659Z",
        description: "User creation date",
    })
    @Column({
        type: DataType.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    })
    dateCreate: Date;

    @ApiProperty({ example: "12", description: "Profile ID" })
    @ForeignKey(() => Profile)
    @Column({ type: DataType.INTEGER, unique: true })
    profileId: number;

    @ApiProperty({ type: () => Profile })
    @BelongsTo(() => Profile)
    profile: Profile;
}
