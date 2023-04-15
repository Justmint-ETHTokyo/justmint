import axios from 'axios';
import { exceptionMessage } from '../modules/constants';
import { SocialUser } from '../interfaces/user/SocialUser';

const googleAuth = async (googleAccessToken: string) => {
  try {
    const user = await axios({
      method: 'get',
      url: `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${googleAccessToken}`,
      headers: {
        authorization: `Bearer ${googleAccessToken}`,
      },
    });

    const userId = user.data.id;
    if (!userId) return exceptionMessage.INVALID_USER;
    const googleUser: SocialUser = {
      userId: userId,
    };

    return googleUser;
  } catch (error) {
    console.log('googleAuth error', error);
    return null;
  }
};

export default {
  googleAuth,
};
