import { NextResponse } from "next/server";

export const respErr = (message: string, status: number = 400) => {
  return NextResponse.json({ error: message }, { status: status });
};

export const respOk = (message: string = "ok", status: number = 200) => {
  return NextResponse.json({ message: message }, { status: status });
};

export const respData = (data: any, status: number = 200) => {
  return NextResponse.json({ data: data }, { status: status });
};

export const respJson = (json: any, status: number = 200) => {
  return NextResponse.json(json, { status: status });
};
