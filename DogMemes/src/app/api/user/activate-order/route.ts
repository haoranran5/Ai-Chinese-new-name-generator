import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { respErr, respOk } from "@/lib/response";
import {
  findOrderByOrderNoAndEmail,
  updateOrderByOrderNo,
  updateOrderById,
} from "@/models/order";

interface Order {
  id: number;
  status: "pending" | "paid" | "activated";
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || "raven-org/ravensaas-template"; // 从环境变量读取仓库名

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return respErr("Login first");
  }

  const { orderId, githubUsername } = await request.json();
  if (!orderId || !githubUsername) {
    return respErr("Parameter missing");
  }
  if (
    typeof githubUsername !== "string" ||
    githubUsername.includes("@") ||
    /\s/.test(githubUsername)
  ) {
    return respErr("GitHub username format error");
  }

  const orderData = await findOrderByOrderNoAndEmail(
    orderId,
    session.user.email
  );
  if (!orderData) {
    return respErr("Order not found");
  }

  if (orderData.status === "pending") {
    return respErr("Order not paid, cannot activate");
  }
  if (orderData.status === "activated") {
    return respErr(
      "Order already activated, please do not repeat the operation"
    );
  }
  if (orderData.status !== "paid") {
    return respErr("Order status abnormal, cannot activate");
  }

  // 调用 GitHub API 邀请协作
  try {
    if (!GITHUB_TOKEN) {
      console.error("GitHub Token not configured");
      return respErr(
        "GitHub Token not configured, please contact administrator"
      );
    }

    // 先验证仓库是否存在
    const repoCheckRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!repoCheckRes.ok) {
      console.error(
        `Repository check failed: ${GITHUB_REPO}`,
        await repoCheckRes.text()
      );
      return respErr(
        "GitHub repository configuration error, please contact administrator"
      );
    }

    // 验证用户是否存在
    const userCheckRes = await fetch(
      `https://api.github.com/users/${githubUsername}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!userCheckRes.ok) {
      return respErr(`GitHub user ${githubUsername} not found`);
    }

    const inviteRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/collaborators/${githubUsername}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({ permission: "read" }),
      }
    );

    if (inviteRes.status !== 201 && inviteRes.status !== 204) {
      const err = await inviteRes.json();
      console.error("GitHub API Error Details:", {
        status: inviteRes.status,
        statusText: inviteRes.statusText,
        error: err,
        repo: GITHUB_REPO,
        username: githubUsername,
      });
      return respErr(
        `GitHub invitation failed: ${err.message || inviteRes.statusText}`
      );
    }
  } catch (e: any) {
    console.error("GitHub API Error", e);
    return respErr(`GitHub API call failed: ${e.message}`);
  }

  const updatedOrder = await updateOrderByOrderNo(orderId, {
    status: "activated",
    paid_at: new Date().toISOString(),
  });

  if (!updatedOrder) {
    return respErr(
      "Activation successful, but order status update failed, please contact administrator"
    );
  }

  const updatedData = await updateOrderByOrderNo(orderId, {
    status: "activated",
    order_detail: JSON.stringify({
      github: githubUsername,
    }),
  });

  if (!updatedData) {
    return respErr(
      "Activation successful, but user profile update failed, please contact administrator"
    );
  }

  return respOk("Activation successful");
}
