import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail, updateUser, insertUser } from "@/models/user";
import { increaseCredits } from "@/services/credit"

//这是登录回调处理文件

// 扩展User类型以包含uuid字段
interface CustomUser extends User {
  uuid?: string;
}

// 扩展Session类型，使其包含uuid
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      uuid: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
  }
}

// 生成UUID的函数
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 处理邀请码逻辑的函数
async function handleInviteCode(userUuid: string, userEmail: string) {
  try {
    // 这里我们需要从某个地方获取邀请码
    // 由于 NextAuth 回调中无法直接访问 URL 参数，我们需要使用其他方式
    // 比如从数据库中的临时表或者通过其他机制

    // 暂时先检查是否有全局的邀请码处理逻辑
    // 实际实现中，我们可能需要在登录前将邀请码存储到某个地方

    console.log(`处理用户 ${userEmail} 的邀请码逻辑`);
    return true;
  } catch (error) {
    console.error("处理邀请码时出错:", error);
    return false;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    // 添加凭证提供者处理Google One Tap
    CredentialsProvider({
      id: "google-one-tap",
      name: "Google One Tap",
      credentials: {
        credential: { label: "Credential", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.credential) return null;

        try {
          // 解析JWT令牌
          const payload = JSON.parse(
            Buffer.from(
              credentials.credential.split(".")[1],
              "base64"
            ).toString()
          );

          console.log("Google One Tap凭证解析结果:", payload);

          // 验证用户信息
          if (!payload?.email || !payload?.sub) {
            console.error("Google One Tap凭证缺少必要信息");
            return null;
          }

          // 返回用户信息
          return {
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            image: payload.picture,
          };
        } catch (error) {
          console.error("解析Google One Tap凭证失败:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      // 移除authorize方法，它在OAuthUserConfig中不被允许
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
    }),
  ],
  // 在这里添加对Google One Tap的支持
  callbacks: {
    async signIn({ user, account, profile }) {
      // 检查是否是从Google One Tap传来的凭证
      if (account?.provider === "google" && account?.type === "credentials") {
        console.log("检测到Google One Tap登录");
        // 这里可以做特殊处理
      }

      console.log("登录回调" + account?.provider);
      // console.log("登录回调被触发");
      // console.log("用户信息:", user);
      // console.log("账号信息:", account);
      // console.log("配置文件:", profile);

      if (!user || !user.email) {
        console.error("用户信息不完整");
        return false;
      }

      try {
       const userData = await findUserByEmail(user.email);

        if (!userData) {
          console.error("用户不存在");
        }

        // 获取提供商ID
        const providerId = String(account?.providerAccountId || account?.id || "");

        let userUuid: string;

        if (userData) {
          // 获取现有用户的uuid
          userUuid = userData.uuid as string;

          const updatedUser = await updateUser(userUuid, {
            nickname: user.name || "",
            avatar_url: user.image || "",
            signin_type: account?.type || "oauth",
            signin_provider: account?.provider || "",
            signin_openid: providerId,
          });
        } else {
          // 为新用户生成uuid
          userUuid = generateUUID();

          const newUser = await insertUser({
            uuid: userUuid,
            email: user.email,
            nickname: user.name || "",
            avatar_url: user.image || "",
            signin_type: account?.type || "oauth",
            signin_ip: "",
            signin_provider: account?.provider || "",
            signin_openid: providerId,
            created_at: new Date().toISOString(),
          });
          
          // 初始用户送10积分
          await increaseCredits(userUuid, 10, "first_registration", null);

          if (!newUser) {
            console.error("创建用户失败:");
            return false;
          }
        }

        // 将uuid添加到用户对象中，以便在jwt回调中使用
        (user as CustomUser).uuid = userUuid;
      } catch (error) {
        console.error("处理用户数据时出错:", error);
        return false;
      }

      return true;
    },
    async jwt({ token, user, account }) {
      // console.log("JWT回调被触发");
      // console.log("令牌信息:", token);
      // console.log("用户信息:", user);
      // console.log("账号信息:", account);

      // 如果是初次登录
      if (account && user) {
        // console.log("更新令牌 - 首次登录");
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          id: user.id,
          uuid: (user as CustomUser).uuid,
        };
      }

      // 后续请求
      return token;
    },
    async session({ session, token }) {
      // console.log("会话回调被触发");
      // console.log("会话信息:", session);
      // console.log("令牌信息:", token);

      if (session.user) {
        session.user.id = token.id as string;
        // 添加uuid到会话
        session.user.uuid = token.uuid as string;
        // 添加访问令牌到会话（如果需要）
        session.accessToken = token.accessToken as string;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30天
  },
  jwt: {
    // 增加JWT的有效期
    maxAge: 60 * 60 * 24 * 30, // 30天
  },
  secret:
    process.env.NEXTAUTH_SECRET || "fallback-secret-do-not-use-in-production",
  logger: {
    error(code, metadata) {
      console.error("认证错误:", { code, metadata });

      // 将错误信息通过自定义事件发送，以便在前端显示
      if (typeof window !== "undefined") {
        // 创建自定义事件
        const errorEvent = new CustomEvent("auth-error", {
          detail: {
            code,
            message: metadata?.message || "认证过程中发生错误",
          },
        });
        // 触发事件
        window.dispatchEvent(errorEvent);
      }
    },
    warn(code) {
      // console.warn("认证警告:", code);
    },
    debug(code, metadata) {
      // console.log("认证调试:", { code, metadata });
    },
  },
};

export default NextAuth(authOptions);
