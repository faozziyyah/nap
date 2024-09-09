// PageWrapper.tsx
'use client';

import React from 'react';
import Main from '@/appLayout/Main';
import RequireAuth from '@/utils/RequireAuth';
import { ProfileProvider } from '@/utils/useProfile';
import { UrlProvider } from '@/contexts/url-context';
import { ArticleProvider } from '@/contexts/article-context';
import { SummaryProvider } from '@/contexts/summary-context';
import { HighlightProvider } from '@/contexts/highlight-context';
import { TranslateProvider } from '@/contexts/translate-context';
import { VideoProvider } from '@/contexts/video-context';
import { Providers } from '@/contexts/theme-context';
import { AudioProvider } from '@/contexts/audio-context';

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <ProfileProvider>
        <Providers>
          <UrlProvider>
            <ArticleProvider>
              <SummaryProvider>
                <HighlightProvider>
                  <TranslateProvider>
                    <VideoProvider>
                      <AudioProvider>
                        <Main>{children}</Main>
                      </AudioProvider>
                    </VideoProvider>
                  </TranslateProvider>
                </HighlightProvider>
              </SummaryProvider>
            </ArticleProvider>
          </UrlProvider>
        </Providers>
      </ProfileProvider>
    </RequireAuth>
  );
}
