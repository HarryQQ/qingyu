import { StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { FilesService } from './files.service';
import { User } from '../users/entities/user.entity';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: Express.Multer.File, user: User): Promise<import("./entities/file.entity").File>;
    findAll(): Promise<import("./entities/file.entity").File[]>;
    findOne(id: string): Promise<import("./entities/file.entity").File>;
    downloadFile(id: string, res: Response): Promise<StreamableFile>;
    remove(id: string): Promise<void>;
}
