import BeYourOwnBoss from 'components/home/BeYourOwnBoss'
import BlogSection from 'components/home/BlogSection'
import PostYourTask from 'components/home/PostYourTask'
import React, { useState } from 'react'
import { readToken } from 'lib/sanity.api'
import { getAllPosts, getClient, getSettings } from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import type { SharedPageProps } from 'pages/_app'
import FAQAccordion from 'components/FAQaccordions'
import Head from 'next/head'
import Navbar from 'components/layout/Navbar'
import PostAssignmentBox from './post-assignment-box'

interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Home(props: PageProps) {
  const { posts, settings, draftMode } = props

  return (
    <>
      <Head>
        <title>
          QualityunitedWriters | Get More Done | Post any assignment. Pick the best person. Get it done. | Post your assignment for free Earn money as a tutor
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="QualityunitedWriters is your one-stop destination for finding the right assignments and talented taskers. Post any assignment, pick the best person, and get it done. Join now to earn money as a tutor or post your assignments for free."
        />
        <meta name="keywords" content="QualityunitedWriters, assignments, tutor, earn money, post assignment" />
        <meta name="author" content="QualityunitedWriters" />
        <meta name="robots" content="index, follow" />
        <meta name="og:title" property="og:title" content="QualityunitedWriters | Get More Done" />
        <meta
          name="og:description"
          property="og:description"
          content="QualityunitedWriters is your one-stop destination for finding the right assignments and talented taskers. Post any assignment, pick the best person, and get it done. Join now to earn money as a tutor or post your assignments for free."
        />
        <meta name="og:image" property="og:image" content="public/sync-my-socials-logo.png" />

        <meta name="og:url" property="og:url" content="https://www.QualityUnited Writers.com" />
      </Head>
      <Navbar />
      <PostAssignmentBox />
      <PostYourTask />
      <BeYourOwnBoss />
      <div className="my-8 bg-blue-50 md:my-16">
        <BlogSection posts={posts} />
      </div>
      <FAQAccordion />
    </>
  )
}

export const getStaticProps = async (ctx: any) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, posts = []] = await Promise.all([
    getSettings(client),
    getAllPosts(client),
  ])

  return {
    props: {
      posts,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
