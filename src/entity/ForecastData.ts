import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Location } from "./Location.js";

@Entity()
@Unique(['period_end', 'location', 'period'])
export class ForecastData {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Location, (location) => location.forecastData)
  location: Location

  @Column({ type: 'decimal', precision: 2, default: 0, comment: 'Air Temperature in degrees Celsius' })
  air_temp: number

  @Column({ type: 'int', default: 0, comment: 'Global Horizontal Irradiance in W/m2' })
  ghi: number

  @Column({ type: 'int', default: 0, comment: 'Diffuse Horizontal Irradiance in W/m2' })
  dhi: number

  @Column({ type: 'int', default: 0, comment: 'Direct Normal Irradiance in W/m2' })
  dni: number

  @Column({ type: 'int', default: 0, comment: 'Global Horizontal Irradiance in W/m2' })
  gti: number

  @Column({ type: 'timestamp', precision: 3, nullable: false, comment: 'End of the period' })
  period_end: Date

  @Column({ type: 'enum', enum: ['PT5M', 'PT10M', 'PT15M', 'PT20M', 'PT30M', 'PT60M'] })
  period: 'PT5M' | 'PT10M' | 'PT15M' | 'PT20M' | 'PT30M' | 'PT60M' //  ISO 8601 format

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(3)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(3)", onUpdate: "CURRENT_TIMESTAMP(3)" })
  updated_at: Date;

}
