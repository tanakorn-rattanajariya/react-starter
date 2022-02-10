import type { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import "logics/helper";
import stylesheet from "styles/index.less";
import Head from "next/head";
import Main from "./Main";

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);
  return (
    <>
      <Head>
        <title>Via-Link</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="Description" content="Logistics Platform" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: stylesheet,
          }}
        />
      </Head>
      <Provider store={store}>
        <Main>
          <Component {...pageProps} />
        </Main>
      </Provider>
    </>
  );
}

// commented this out cuz it'll prevent automatic static optimization.
// MyApp.getInitialProps = async ({ Component, ctx }) => {
//   let pageProps;
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps({ ctx });
//   }
//   return { pageProps };
// };

// export function reportWebVitals(metric) {}

export default MyApp;
