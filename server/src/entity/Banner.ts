// tslint:disable-next-line:max-line-length
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Banner extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public nev: string;

    @Column()
    public aktivEttol: Date;

    @Column()
    public aktivEddig: Date;

    @Column()
    public statusz: string;

    @Column()
    public tipus: string;

    @Column()
    public kep: string;

    @Column()
    public keplink: string;

    @Column()
    public embedkod: string;

    @Column()
    public pozicio: string;

    @Column()
    public popupShowDelay: number;

    @Column()
    public popupAutocloseTime: number;

    @CreateDateColumn()
    public createdDate: Date;

    @UpdateDateColumn()
    public updatedDate: Date;
}
