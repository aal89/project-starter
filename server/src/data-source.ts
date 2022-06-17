import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ormconfig } from '../ormconfig';

export const AppDataSource = new DataSource(ormconfig as DataSourceOptions);
