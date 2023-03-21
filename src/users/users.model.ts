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

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    username: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataType.ENUM("admin", "user"), allowNull: false })
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
