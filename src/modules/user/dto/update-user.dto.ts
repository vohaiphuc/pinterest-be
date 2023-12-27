import { ApiProperty } from "@nestjs/swagger";

export class UpdateInfoDto {
    @ApiProperty({ type: String })
    ho_ten: string

    @ApiProperty({ type: Date })
    ngay_sinh: Date
}

export class UpdatePasswordDto {
    @ApiProperty({ type: String })
    mat_khau: string

    @ApiProperty({ type: String })
    mat_khau_moi: string
}