import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

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

}
