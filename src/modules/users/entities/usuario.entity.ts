import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TipoUsuario } from "./tipo_usuario.entity";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column('text', { nullable: false })
    nombres: string//nombres

    @Column('text', { nullable: false })
    apellidos: string;//apellidos

    @Column({ nullable: true })
    sexo: string;//apellidos

    @Column('text', { nullable: false, unique: true })
    usuario: string;//nombre de usuario

    @Column('text', { nullable: true })
    email: string;//correo electronico

    @Column('text', { nullable: true })
    imagen: string;

    @Column('text', { select: false })
    contrasena: string;

    @CreateDateColumn()
    createdAt: Date;

    //SoftDelete
    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => TipoUsuario, (typeUser) => typeUser.usuarios)
    tipo_usuario: TipoUsuario;
}