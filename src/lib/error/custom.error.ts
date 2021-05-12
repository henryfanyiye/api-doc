export const CustomError = {
  InternalServerError: { status: 500, code: 500, message: 'Internal server error.' },
  InvalidUserId: { status: 400, code: 1001, message: 'UserId does not exist.' },
  UserNameOrPasswordError: { status: 400, code: 1002, message: 'Username or password error.' },
  UserNameExist: { status: 400, code: 1003, message: 'Username or password error.' },
  EmailExist: { status: 400, code: 1004, message: 'Username or password error.' },
  PasswordError: { status: 400, code: 1005, message: 'Password error.' },
  NoUserExist: { status: 400, code: 1006, message: 'User does not exist.' },
  InvalidProjectId: { status: 400, code: 1010, message: 'Project does not exist.' },
  InvalidCatalogId: { status: 400, code: 1011, message: 'Catalog does not exist.' },
  InvalidItemId: { status: 400, code: 1012, message: 'Item does not exist.' },
};
