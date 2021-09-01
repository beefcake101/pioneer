import React, { useRef } from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SidePanel } from '@/common/components/page/SidePanel'
import { useMockActivities } from '@/common/hooks/useMockActivities'
import { ForumPageHeader } from '@/forum/components/ForumPageHeader'
import { MyThreadsBrowser } from '@/forum/components/threads/MyThreadsBrowser'
import { RandomThreadsBrowser } from '@/forum/components/threads/RandomThreadsBrowser'
import { ThreadsLayout } from '@/forum/components/threads/ThreadsLayout'

import { ForumTabs } from './components/ForumTabs'

export const ForumOverview = () => {
  const sideNeighborRef = useRef<HTMLDivElement>(null)
  const activities = useMockActivities()

  return (
    <PageLayout
      header={
        <ForumPageHeader title={<PageTitle>Forum</PageTitle>}>
          <ForumTabs />
        </ForumPageHeader>
      }
      main={
        <MainPanel ref={sideNeighborRef}>
          <ThreadsLayout>
            <MyThreadsBrowser />
            <RandomThreadsBrowser label="Your watchlist" />
            <RandomThreadsBrowser label="Popular threads" />
            <RandomThreadsBrowser label="Polls you participated in" />
          </ThreadsLayout>
        </MainPanel>
      }
      sidebar={
        <SidePanel neighbor={sideNeighborRef}>
          <ActivitiesBlock activities={activities} label="Forum Activities" />
        </SidePanel>
      }
    />
  )
}