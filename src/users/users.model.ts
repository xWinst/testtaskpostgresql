import {
    Model,
    Table,
    Column,
    DataType,
    Sequelize,
    BelongsTo,
    ForeignKey,
} from "sequelize-typescript";
import { Profile } from "profiles/profiles.model";

interface UserCreationAtrributes {
    username: string;
    email: string;
    role: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAtrributes> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    })
    id: number;

    @Column({ type: DataType.STRING, unique: true })
    username: string;

    @Column({ type: DataType.STRING, unique: true })
    email: string;

    @Column({ type: DataType.ENUM("admin", "user") })
    role: string;

    @Column({
        type: DataType.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    })
    dateCreate: Date;

    @ForeignKey(() => Profile)
    @Column({ type: DataType.INTEGER, unique: true })
    profileId: number;

    @BelongsTo(() => Profile)
    profile: Profile;
}
