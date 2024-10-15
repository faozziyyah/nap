import type { Metadata } from 'next';
import React from 'react';
import 'antd/dist/reset.css';
import '@/styles/globals.css';

import PageWrapper from './pageWrapper';

export const metadata: Metadata = {
  title: 'News App',
  description: 'News App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images//Logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="/Logo.png" />
        {/*<link rel="stylesheet" href="/src/styles/globals.css" />*/}
        <script src="https://js.paystack.co/v2/inline.js" async></script>
        <link href="https://fonts.cdnfonts.com/css/manrope" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/axiforma" rel="stylesheet" />
        {/*<link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />*/}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
        />
        <link
          href="https://fonts.cdnfonts.com/css/cera-compact-pro"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          //   crossOrigin
        />
        {/*<link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap"
          rel="stylesheet"
        />*/}
      </head>
      <body>
        <div id="root">
          <PageWrapper>{children}</PageWrapper>
        </div>
      </body>

      {/* <script type="module" src="/src/index.tsx"></script>

  <script type="text/javascript" defer>
    var $zoho = $zoho || {};
    $zoho.salesiq = $zoho.salesiq || {
      widgetcode:
        'c0015e192e0993f33355e48437d05086f261ba0d3f2e4836c2cc89cc8e4b853bd26184bd399c39c25760b4f3715a450b',
      values: {},
      ready: function () {},
    };
    var d = document;
    s = d.createElement('script');
    s.type = 'text/javascript';
    s.id = 'zsiqscript';
    s.defer = true;
    s.src = 'https://salesiq.zoho.com/widget';
    t = d.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
    d.write("<div id='zsiqwidget'></div>");
  </script> */}
    </html>
  );
}
