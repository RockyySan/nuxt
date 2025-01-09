let instance = null
class AuthTransformer {
  static getInstance() {
    if (!instance) {
      instance = new AuthTransformer()
    }
    return instance
  }

  fetch(res) {
    if (!res) {
      return {}
    }
    const dayjs = useDayjs()
    return {
      token_type: res?.token_type,
      access_token: res?.access_token,
      token_expires_at: res?.token_expires_at,
      user: {
        id: res?.user?.id,
        first_name: res?.user?.first_name,
        last_name: res?.user?.last_name,
        full_name: res?.user?.first_name + ' ' + res?.user?.last_name,
        gender: res?.user?.gender,
        username: res?.user?.username,
        phone_number: res?.user?.phone_number,
        email: res?.user?.email,
        position: res?.user?.position,
        government_institution: res?.user?.government_institution,
        avatar: res?.user?.avatar,
        user_type: res?.user?.user_type,
        is_active: res?.user?.is_active,
        status: res?.user?.status,
        is_enable_two_factor_authentication:
          res?.user?.is_enable_two_factor_authentication,
        two_factor_authentication_type:
          res?.user?.two_factor_authentication_type,
        is_email_verified: res?.user?.is_email_verified,
        created_at: res?.user?.created_at
          ? dayjs(res.user.created_at).format('YYYY/MM/DD hh:mm A')
          : '',
        updated_at: res?.user?.updated_at
          ? dayjs(res.user.updated_at).format('YYYY/MM/DD hh:mm A')
          : '',
      },
    }
  }

  loginReq(req) {
    if (!req) {
      return {}
    }
    return {
      username: req?.username,
      password: req?.password,
    }
  }

  registerReq(req) {
    if (!req) {
      return {}
    }
    return {
      first_name: req?.first_name,
      last_name: req?.last_name,
      gender: req?.gender,
      username: req?.username,
      phone_number: req?.phone_number,
      email: req?.email,
      password: req?.password,
      password_confirmation: req?.password_confirmation,
      user_type: req?.user_type,
      position: req?.position,
      government_institution: req?.government_institution,
    }
  }

  verifyOTPCodeReq(req) {
    if (!req) {
      return {}
    }
    return {
      action_type: req?.action_type,
      provided_value: req?.provided_value,
      verify_code: req.verify_code,
      two_factor_method: req?.two_factor_method,
      two_factor_info: req?.two_factor_info
    }
  }
}

export default AuthTransformer
