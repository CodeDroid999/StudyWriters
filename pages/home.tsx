import BeYourOwnBoss from 'components/home/BeYourOwnBoss'
import BlogSection from 'components/home/BlogSection'
import Features from 'components/home/Features'
import Hero from 'components/home/Hero'
import PostYourTask from 'components/home/PostYourTask'
import Layout from 'components/layout/Layout'
import React, { useState } from 'react'
import { readToken } from 'lib/sanity.api'
import { getAllPosts, getClient, getSettings } from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import type { SharedPageProps } from 'pages/_app'
import FAQAccordion from 'components/FAQaccordions'
import Head from 'next/head'
import PostAssignment from 'components/Homepage/PostAssignment'

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
    <Layout>
      <Head>
        <title>
          QualityUnitedWriters - Your Academic Research and Project Partner
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
        />
        <meta name="keywords" content="Academic writing services, Expert academic writers, Professional research assistance, High-quality research papers, Academic project support, Thesis and dissertation help, Essay writing service, Top-rated tutors, Academic success tips, Homework assistance, Online tutoring, Quality writing solutions, Best essay writers, Custom research papers, Academic support platform, Tutoring for students, Research paper editing, Writing and editing services, Academic guidance, Homework help for students" />
        <meta name="author" content="QualityUnitedWriters" />
        <meta name="robots" content="index, follow" />
        <meta name="og:title" property="og:title" content="QualityUnitedWriters - Your Academic Research and Project Partner" />
        <meta
          name="og:description"
          property="og:description"
          content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
        />
        <meta name="og:image" property="og:image" content="public/airtaskalogo.jpeg" />
        <meta name="og:url" property="og:url" content="https://www.qualityunitedswriters.com" />
      </Head>|<Head>
        <title>
          QualityUnitedWriters - Your Academic Research and Project Partner
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
        />
        <meta name="keywords" content="Academic writing services, Expert academic writers, Professional research assistance, High-quality research papers, Academic project support, Thesis and dissertation help, Essay writing service, Top-rated tutors, Academic success tips, Homework assistance, Online tutoring, Quality writing solutions, Best essay writers, Custom research papers, Academic support platform, Tutoring for students, Research paper editing, Writing and editing services, Academic guidance, Homework help for students" />
        <meta name="author" content="QualityUnitedWriters" />
        <meta name="robots" content="index, follow" />
        <meta name="og:title" property="og:title" content="QualityUnitedWriters - Your Academic Research and Project Partner" />
        <meta
          name="og:description"
          property="og:description"
          content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
        />
        <meta name="og:image" property="og:image" content="public/airtaskalogo.jpeg" />
        <meta name="og:url" property="og:url" content="https://www.qualityunitedswriters.com" />
      </Head>|<Head>
        <title>
          QualityUnitedWriters - Your Academic Research and Project Partner
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
        />
        <meta name="keywords" content="Academic writing services, Expert academic writers, Professional research assistance, High-quality research papers, Academic project support, Thesis and dissertation help, Essay writing service, Top-rated tutors, Academic success tips, Homework assistance, Online tutoring, Quality writing solutions, Best essay writers, Custom research papers, Academic support platform, Tutoring for students, Research paper editing, Writing and editing services, Academic guidance, Homework help for students" />
        <meta name="author" content="QualityUnitedWriters" />
        <meta name="robots" content="index, follow" />
        <meta name="og:title" property="og:title" content="QualityUnitedWriters - Your Academic Research and Project Partner" />
        <meta
          name="og:description"
          property="og:description"
          content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
        />
        <meta name="og:image" property="og:image" content="public/airtaskalogo.jpeg" />
        <meta name="og:url" property="og:url" content="https://www.qualityunitedswriters.com" />
      </Head>|<Head>
        <title>
          QualityUnitedWriters - Your Academic Research and Project Partner
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
        />
        <meta name="keywords" content="Academic writing services, Expert academic writers, Professional research assistance, High-quality research papers, Academic project support, Thesis and dissertation help, Essay writing service, Top-rated tutors, Academic success tips, Homework assistance, Online tutoring, Quality writing solutions, Best essay writers, Custom research papers, Academic support platform, Tutoring for students, Research paper editing, Writing and editing services, Academic guidance, Homework help for students" />
        <meta name="author" content="QualityUnitedWriters" />
        <meta name="robots" content="index, follow" />
        <meta name="og:title" property="og:title" content="QualityUnitedWriters - Your Academic Research and Project Partner" />
        <meta
          name="og:description"
          property="og:description"
          content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
        />
        <meta name="og:image" property="og:image" content="public/airtaskalogo.jpeg" />
        <meta name="og:url" property="og:url" content="https://www.qualityunitedswriters.com" />
      </Head>|<Head>
        <title>
          QualityUnitedWriters - Your Academic Research and Project Partner
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
        />
        <meta name="keywords" content="Academic writing services, Expert academic writers, Professional research assistance, High-quality research papers, Academic project support, Thesis and dissertation help, Essay writing service, Top-rated tutors, Academic success tips, Homework assistance, Online tutoring, Quality writing solutions, Best essay writers, Custom research papers, Academic support platform, Tutoring for students, Research paper editing, Writing and editing services, Academic guidance, Homework help for students" />
        <meta name="author" content="QualityUnitedWriters" />
        <meta name="robots" content="index, follow" />
        <meta name="og:title" property="og:title" content="QualityUnitedWriters - Your Academic Research and Project Partner" />
        <meta
          name="og:description"
          property="og:description"
          content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
        />
        <meta name="og:image" property="og:image" content="public/airtaskalogo.jpeg" />
        <meta name="og:url" property="og:url" content="https://www.qualityunitedswriters.com" />
      </Head>
      <div className="px-3 sm:px-4 lg:px-6 xl:px-12">
      <PostAssignment />
        <PostYourTask />
        <Features />
      </div>
      <div className="lg:px-6 xl:px-12">
        <BeYourOwnBoss />
      </div>
      <div className="my-8 bg-blue-50 md:my-16">
        <BlogSection posts={posts} />
      </div>
      <div className="bg-neutral-100 lg:px-6 xl:px-12">
        <FAQAccordion />
      </div>
    </Layout>
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
