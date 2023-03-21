import { Model, Table, Column, DataType, HasOne } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "users/users.model";

interface ProfileCreationAtrributes {
    firstName: string;
    lastName: string;
    state: string;
}

@Table({ tableName: "profiles" })
export class Profile extends Model<Profile, ProfileCreationAtrributes> {
    @ApiProperty({ example: "12", description: "Profile ID" })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    })
    id: number;

    @ApiProperty({ example: "Oleg", description: "User name" })
    @Column({ type: DataType.STRING, allowNull: false })
    firstName: string;

    @ApiProperty({ example: "Chuchin", description: "User surname" })
    @Column({ type: DataType.STRING, allowNull: false })
    lastName: string;

    @ApiProperty({
        example: "male",
        description: "User gender",
        enum: ["male", "female"],
    })
    @Column({ type: DataType.ENUM("male", "female"), allowNull: false })
    state: string;

    @HasOne(() => User)
    user: User;
}
