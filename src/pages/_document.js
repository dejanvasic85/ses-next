import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html data-theme="light">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Melbourne Electricians. Free Quotes. Lighting. Testing. Data. Air Conditioning. Emergency Call out. Upgrade your old Halogen lights for Free!"
          />
          <meta name="robots" content="noodp" />
          <link rel="canonical" href="http://sesmelbourne.com.au/" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Storm Electrical Solutions Melbourne" />
          <meta
            property="og:description"
            content="Storm Electrical Solutions provides many services to all areas of Melbourne, with over 12 years experience in the electrical industry. SES can provide you with an extensive range of expertise within the commercial, Industrial and Residential sector. Whether it is installations, maintenance, fault finding, testing, large or small SES can cater for your needs with its friendly, professional, neat, reliable and efficient service at a phone call away at very competitive rates."
          />
          <meta property="og:url" content="http://sesmelbourne.com.au/" />
          <meta property="og:site_name" content="Storm Electrical Melbourne" />
          <meta
            property="og:image"
            content="http://sesmelbourne.com.au/wp-content/uploads/2016/03/SES-Storm-Electrical-Solutions.gif"
          />
          <meta name="twitter:card" content="summary" />
          <meta
            name="twitter:description"
            content="Melbourne Electricians. Free Quotes. Lighting. Testing. Data. Air Conditioning. Emergency Call out. Upgrade your old Halogen lights for Free!"
          />
          <meta name="twitter:title" content="Storm Electrical Solutions - Melbourne Electricians" />
          <meta
            name="twitter:image"
            content="http://sesmelbourne.com.au/wp-content/uploads/2016/03/SES-Storm-Electrical-Solutions.gif"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
