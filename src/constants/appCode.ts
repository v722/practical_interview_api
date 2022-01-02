export enum AppError {
    UserNotFound = "User not found",
    UserAlreadyExist = "User already exist",
    Unauthorized = "Unauthorized",
    MissingFileInput = "Missing file input",
    OldPasswordNotMatched = "Old password not matched"
}

export enum ErrorCode {
    NotFound = 404,
    Unauthorized = 401,
    BadRequest = 400
}

export enum AppSuccess {
    Success = "success",
    Message = "API Operation successful"
}