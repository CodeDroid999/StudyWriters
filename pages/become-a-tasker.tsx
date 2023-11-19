import React, { useState } from 'react'
import Layout from 'components/layout/Layout'
import Hero from 'components/tasker/Hero'
import SetPrice from 'components/tasker/SetPrice'
import BrowseOpportunities from 'components/tasker/BrowseOpportunities'
import GetPaid from 'components/tasker/GetPaid'
import Head from 'next/head'

export default function Join() {
  return (
    <Layout>
      <Head>
        <title>
          Airtaska | Get More Done | Post any task. Pick the best person. Get it done. | Post your task for free Earn money as a tasker
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Airtaska is your one-stop destination for finding the right tasks and talented taskers. Post any task, pick the best person, and get it done. Join now to earn money as a tasker or post your tasks for free."
        />
        <meta name="keywords" content="Airtaska, tasks, tasker, earn money, post task" />
        <meta name="author" content="Airtaska" />
        <meta name="robots" content="index, follow" />
        <meta name="og:title" property="og:title" content="Airtaska | Get More Done" />
        <meta
          name="og:description"
          property="og:description"
          content="Airtaska is your one-stop destination for finding the right tasks and talented taskers. Post any task, pick the best person, and get it done. Join now to earn money as a tasker or post your tasks for free."
        />
        <meta name="og:image" property="og:image" content="public/airtaskalogo.jpeg" />
        <meta name="og:url" property="og:url" content="https://www.airtaska.com" />
      </Head>

      <div className="px-3 sm:px-4 lg:px-6 xl:px-12">
        <Hero />
        <BrowseOpportunities />
        <SetPrice />
        <GetPaid />
      </div>
    </Layout>
  )
}
