export const CustomError = {
  InternalServerError: { status: 500, code: 500, message: 'Internal server error.' },
  InvalidUserId: { status: 400, code: 1001, message: 'UserId does not exist.' },
  UserNameOrPasswordError: { status: 400, code: 1002, message: 'Username or password error.' },
  UserNameExist: { status: 400, code: 1002, message: 'Username or password error.' },
  EmailExist: { status: 400, code: 1002, message: 'Username or password error.' },
};
