import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({ type: String })
    email: string

    @ApiProperty({ type: String })
    mat_khau: string

    @ApiProperty({ type: String })
    ho_ten: string

    @ApiProperty({ type: Date })
    ngay_sinh: Date
}