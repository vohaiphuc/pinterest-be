export type TUserAuth = {
    nguoi_dung_id: number,
    key: number,
}

export interface IUserDataAuth {
    data: TUserAuth
}

export interface IUserTokenAuth {
    data: TUserAuth,
    iat: number,
    exp: number
}