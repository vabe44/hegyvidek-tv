// tslint:disable-next-line:max-line-length
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Banner extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public nev: string;

    @Column()
    public kep: string;

    @Column()
    public pozicio: string;

    @Column()
    public statusz: string;

    @CreateDateColumn()
    public createdDate: Date;

    @UpdateDateColumn()
    public updatedDate: Date;
}
