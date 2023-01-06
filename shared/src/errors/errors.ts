export const errorCode = (code: string) => (meta?: Record<string, string>) => ({
  code,
  meta
})

export const errors = {
  AlreadyActivated: errorCode('User.AlreadyActivated'),
  DeletingOwnAccount: errorCode('User.CantDeleteOwn'),
  EmailAddressTaken: errorCode('User.EmailTaken'),
  IncorrectOtp: errorCode('User.WrongOTP'),
  IncorrectPassword: errorCode('User.WrongPassword'),
  NotAllowedDeleteAccounts: errorCode('User.NotAllowedToDeleteAccounts'),
  NotAllowedListUsers: errorCode('User.NotAllowedToListUsers'),
  NotAllowedResetPassword: errorCode('User.NotAllowedToResetPassword'),
  OnlyNewActivation: errorCode('User.OnlyNewActivation'),
  PasswordConstraint: errorCode('User.ChangePasswordConstraint'),
  StatsRetrieval: errorCode('User.NotAllowedToRetrieveStats'),
  Sww: errorCode('Error.SWW'),
  UnknownUser: errorCode('User.Unknown'),
  UnsupportedImageType: errorCode('User.UploadUnsupportedImageType'),
  UserLocked: errorCode('User.Locked'),
  UsernameLength: errorCode('User.NameConstraint'),
  UsernameTaken: errorCode('User.UsernameTaken'),
  UserNotFound: errorCode('User.NotFound'),
}
