export interface IPageInfo {
    empty: boolean,
    first: boolean,
    last: boolean,
    number: number,
    numberOfElements: number,
    size: number,
    totalElements: number,
    totalPages: number,
}

export interface IPage<T> extends IPageInfo {
    content: T[],
}

export interface IQueryParams {
    size: number,
    page: number,
}

export interface IUserResponse {
    id: number,
    name: string,
    age: number
}

export interface IUserRequest {
    name: string,
    age: string
}