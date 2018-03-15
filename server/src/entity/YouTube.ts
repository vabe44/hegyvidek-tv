import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class YouTube extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public accessToken: string;

    @Column()
    public refreshToken: string;
}
