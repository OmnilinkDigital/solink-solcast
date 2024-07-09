import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ForecastData } from "./ForecastData.js";

@Entity()
export class Location {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  latitude: number

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude: number

  @OneToMany(() => ForecastData, (data) => data.location)
  forecastData: ForecastData[]

  @Column()
  resource_id: string

  @Column({ type: 'varchar', length: 255, unique: true })
  internal_id: string

}
