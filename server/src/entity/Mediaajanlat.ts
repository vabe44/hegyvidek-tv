// tslint:disable-next-line:max-line-length
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Mediaajanlat extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        length: 65535,
    })
    public szoveg: string;
}
