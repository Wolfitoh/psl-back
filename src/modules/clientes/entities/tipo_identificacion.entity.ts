import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Identificacion } from "./identificacion.entity";

@Entity()
export class TipoIdentificacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;//Nombre rol

    @CreateDateColumn()
    createdAt: Date;

    //SoftDelete
    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Identificacion, TipoToIdentificacion => TipoToIdentificacion.tipo_identificacion)
    identificaciones: Identificacion[];
}