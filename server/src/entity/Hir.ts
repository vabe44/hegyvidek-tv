import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Hir extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public szoveg: string;

    @Column()
    public statusz: string;
}
