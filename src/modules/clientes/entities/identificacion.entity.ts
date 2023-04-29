import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoIdentificacion } from "./tipo_identificacion.entity";

@Entity()
export class Identificacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    valor: string;//valor

    @ManyToOne(() => TipoIdentificacion, (typeIdent) => typeIdent.identificaciones)
    tipo_identificacion: TipoIdentificacion;
}