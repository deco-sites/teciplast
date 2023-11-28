import { setCookie } from 'std/http/mod.ts';

export const logout = (req: Request) => {
  try {
    setCookie(req.headers, {
      name: 'VtexIdclientAutCookie_tecilar',
      value: '',
      path: '/',
      secure: true,
      httpOnly: true,
    });
  } catch (e) {
    // console.log({ e });
    return e;
  }
};

export default logout;
