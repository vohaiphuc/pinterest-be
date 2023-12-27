import { ApiProperty } from "@nestjs/swagger";

export class CommentDto {
    @ApiProperty({ type: String })
    hinh_id: string

    @ApiProperty({ type: String })
    noi_dung: string
}