let instance = null
class UserTransformer {
  static getInstance() {
    if (!instance) {
      instance = new UserTransformer()
    }
    return instance
  }

  fetch(res) {
    if (!res) {
      return {}
    }
    const dayjs = useDayjs()
    return {
      id: res?.id,
      first_name: res?.first_name,
      last_name: res?.last_name,
      full_name: res?.first_name + ' ' + res?.last_name,
      gender: res?.gender,
      username: res?.username,
      phone_number: res?.phone_number,
      email: res?.email,
      position: res?.position,
      government_institution: res?.government_institution,
      avatar: res?.avatar,
      user_type: res?.user_type,
      is_active: res?.is_active,
      status: res?.status,
      is_enable_two_factor_authentication:
        res?.is_enable_two_factor_authentication,
      two_factor_authentication_type: res?.two_factor_authentication_type,
      is_email_verified: res?.is_email_verified,
      created_at: res?.created_at
        ? dayjs(res.created_at).format('YYYY/MM/DD hh:mm A')
        : '',
      updated_at: res?.updated_at
        ? dayjs(res.updated_at).format('YYYY/MM/DD hh:mm A')
        : '',
    }
  }

  updateProfileReq(req) {
    if (!req) {
      return {}
    }
    return {
      last_name: req?.last_name,
      first_name: req?.first_name,
      gender: req?.gender,
      government_institution: req?.government_institution,
      avatar: req?.avatar,
    }
  }

  updatePasswordReq(req) {
    if (!req) {
      return {}
    }
    return {
      current_password: req?.current_password,
      new_password: req?.new_password,
      password_confirmation: req?.password_confirmation,
    }
  }
}

export default UserTransformer
