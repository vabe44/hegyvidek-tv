import * as bcrypt from "bcrypt";
// tslint:disable-next-line:max-line-length
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @CreateDateColumn()
    public createdDate: Date;

    @UpdateDateColumn()
    public updatedDate: Date;

    public hashPassword(password: string): string {
        return bcrypt.hashSync(password, 10);
    }
}
