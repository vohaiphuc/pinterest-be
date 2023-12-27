import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({ type: String })
    email: string

    @ApiProperty({ type: String })
    mat_khau: string
}