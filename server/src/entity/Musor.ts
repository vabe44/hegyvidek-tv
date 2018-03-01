import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Musor extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public youtube: string;

    @Column()
    public kategoria: string;

    @Column()
    public datum: Date;

    @Column()
    public tartalom: string;

    @Column()
    public kulcsszavak: string;

    @Column()
    public kiemelt: boolean;
}
