import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform<string, number> {
    constructor(
        private readonly defaultValue: number
    ) { }
    transform(value: string, metadata: ArgumentMetadata): number {
        const x = this
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            return this.defaultValue
        }
        return val;
    }
}