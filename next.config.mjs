import withLess from 'next-with-less';

/** @type {import('next').NextConfig} */
const nextConfig = withLess({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
      // modifyVars: {
      //   'primary-color': 'var(--primary-color)',
      //   'text-color': 'var(--text-color)',
      //   'body-background': 'var(--background-color)',
      //   'component-background': 'var(--component-background)',
      // },
    },
  },
  images: {
    domains: [],
  },
});

export default nextConfig;
