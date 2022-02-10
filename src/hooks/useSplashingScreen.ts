import React from "react";
import { NReduxProps } from "model/nredux";
import { NextRouter } from "next/router";
export default function useSplashingScreen(
  props: { router: NextRouter } & (NReduxProps | undefined)
) {
  const { router, action, reducer } = props;
  const { cognito_user_auth, cognito_user_info } = reducer?.matching || {};

  const pathname = router.pathname.substring(1);
  const isAuthPage = false;

  const splashing =
    !(cognito_user_info != null || isAuthPage) || pathname === "/";
  const noHeader = isAuthPage || splashing;

  return {
    splashing,
    noHeader,
  };
}
