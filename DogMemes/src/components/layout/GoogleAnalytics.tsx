import Script from "next/script";
import { GA_TRACKING_ID, OPENPANEL_CLIENT_ID } from "@/lib/ga";

const GoogleAnalytics = () => {
  return (
    <>
      {/* Google Analytics */}
      {GA_TRACKING_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_TRACKING_ID}');
            `}
          </Script>
        </>
      )}

      {/* OpenPanel Analytics */}
      {OPENPANEL_CLIENT_ID && (
        <>
          <Script
            id="openpanel-analytics"
            strategy="afterInteractive"
            src="https://openpanel.dev/op.js"
          />
          <Script id="openpanel-init" strategy="afterInteractive">
            {`
              window.op = window.op || function(...args) {
                (window.op.q = window.op.q || []).push(args);
              };

              window.op('init', {
                clientId: '${OPENPANEL_CLIENT_ID}',
                trackScreenViews: true,
                trackOutgoingLinks: true,
                trackAttributes: true,
              });
            `}
          </Script>
        </>
      )}
    </>
  );
};

export default GoogleAnalytics;
