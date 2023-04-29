import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Identificacion } from "./identificacion.entity";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { nullable: false })
    nombres: string

    @Column('text', { nullable: false })
    apellidos: string;

    @Column('text', { nullable: true, unique: true })
    usuario: string;

    @Column('text', { nullable: false })
    sexo: string;

    @Column('text', { nullable: true })
    telefono: string;

    @Column('text', { nullable: true })
    pais: string;

    @Column('text', { nullable: true })
    ciudad: string;

    @Column('text', { nullable: true })
    email: string;

    @Column('text', { nullable: true, default: 'assets/images/user/admin.jpg' })
    imagen: string;

    @Column('text', { select: false, nullable: true })
    contrasena: string;

    @CreateDateColumn()
    createdAt: Date;

    //SoftDelete
    @DeleteDateColumn()
    deletedAt: Date;

    @OneToOne(() => Identificacion, { cascade: true, eager: true })
    @JoinColumn()
    identificacion: Identificacion;

}