import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
@Entity()
export class TipoUsuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;//Nombre rol

    @CreateDateColumn()
    createdAt: Date;

    //SoftDelete
    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Usuario, typeUserToUser => typeUserToUser.tipo_usuario)
    usuarios: Usuario[];
}