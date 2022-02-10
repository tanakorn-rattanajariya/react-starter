import { useNReduxDispatcher, useNReduxMapping } from "../../nredux";
import { connect } from "react-redux";
import React from "react";
import { Navigator, SplashScreen } from "src/components";
import { withRouter, useRouter, NextRouter } from "next/router";
import useSplashingScreen from "src/hooks/useSplashingScreen";
import { NReduxProps } from "model/nredux";

const modalDuration = 2;
const routerAction = (
  router: NextRouter,
  isback?: boolean,
  nextpath?: string
) => {
  if (nextpath) {
    router.push(nextpath);
  } else if (isback) {
    router.back();
  }
};

export interface MainProps {
  fullscreen?: boolean;
  router: NextRouter;
  children: React.ReactElement;
}

const Main: any = (props: MainProps & (NReduxProps | undefined)) => {
  const { action, reducer, fullscreen } = props;

  const router = useRouter();
  const { splashing, noHeader } = useSplashingScreen({
    action,
    reducer,
    router,
  });
  const { error, success, isback, nextpath, message } = reducer?.component;
  React.useEffect(() => {
    if (success || error) {
      if (!message) {
        routerAction(router, isback, nextpath);
      } else {
        // displayMessage(router, message, isback, nextpath);
      }
    }
  }, [success, error]);

  return (
    <Navigator
      action={action}
      reducer={reducer}
      noHeader={noHeader}
      splashing={splashing}
    >
      {splashing ? (
        <SplashScreen />
      ) : (
        <div style={{ padding: fullscreen ? 0 : 10, height: "100%" }}>
          <MainContent {...props} router={router} />
        </div>
      )}
    </Navigator>
  );
};

const MainContent: any = (props: MainProps & (NReduxProps | undefined)) => {
  const { children } = props;

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          action: props.action,
          reducer: props.reducer,
        });
      })}
    </>
  );
};

const WrappedMain = connect(
  useNReduxMapping,
  useNReduxDispatcher
)(withRouter(Main));

export default WrappedMain;
