import { Model, Table, Column, DataType, HasOne } from "sequelize-typescript";
import { User } from "users/users.model";

interface ProfileCreationAtrributes {
    firstName: string;
    lastName: string;
    state: string;
}

@Table({ tableName: "profiles" })
export class Profile extends Model<Profile, ProfileCreationAtrributes> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    firstName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    lastName: string;

    @Column({ type: DataType.ENUM("male", "female"), allowNull: false })
    state: string;

    @HasOne(() => User)
    user: User;
}
