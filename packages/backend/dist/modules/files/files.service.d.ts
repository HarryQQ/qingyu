import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { User } from '../users/entities/user.entity';
export declare class FilesService {
    private readonly fileRepository;
    constructor(fileRepository: Repository<File>);
    create(file: Express.Multer.File, uploader: User): Promise<File>;
    findAll(): Promise<File[]>;
    findOne(id: number): Promise<File>;
    remove(id: number): Promise<void>;
}
