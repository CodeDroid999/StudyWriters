/* eslint-disable @next/next/no-sync-scripts */
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>
          Airtaska | Get More Done | Post any assignment. Pick the best person. Get it
          done. | Post your assignment for free Earn money as a tasker
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/public/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/public/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/public/favicon/favicon-32x32.png"
        />
        <meta
          name="description"
          content="Post your assignment for free | Earn money as a tasker| Discover how Airtaska works | Trusted ratings and reviews| Insurance for peace of mind | Join Airtaska today!"
        />
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <main className="mt-20 lg:mt-24">{children}</main>
      <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js" />
      <Footer />
    </div>
  )
}
