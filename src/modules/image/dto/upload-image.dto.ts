// import { ApiProperty } from "@nestjs/swagger";

// export class UploadImageDto {
//     @ApiProperty({
//         type: 'string',
//         format: 'binary',
//     })
//     file: string;
// }

import { ApiProperty } from "@nestjs/swagger";

export class UploadImageDto {
    @ApiProperty({
        type: 'array',
        items: {
            type: 'string',
            format: 'binary',
        },
    })
    file: Array<string>; // Assuming an array of file strings

    @ApiProperty({ type: String })
    ten_hinh: string

    @ApiProperty({ type: String, required: false })
    mo_ta?: string
}
