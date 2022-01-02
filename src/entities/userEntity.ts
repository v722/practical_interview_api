import { BeforeInsert, Column, Entity } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Base } from './baseEntity';

@Entity('users')
export class User extends Base {

    @Column({ type: 'text', default: null })
    first_name: string;

    @Column({ type: 'text', default: null })
    last_name: string;

    @Column({ type: 'text', default: null })
    profile_image: string;

    @Column({ type: 'text', unique: true })
    email: string;

    @Column({ type: 'text' })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await User.hashPassword(this.password);
    }

    public async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    public static async hashPassword(password: string) {
        if (password) {
            return bcrypt.hash(password, 10);
        }
        return password;
    }
}