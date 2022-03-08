import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

export default function Surf({ surfData }) {
  return (
    <Layout>
      <Head>
        <title>Sydney Surf Report</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{surfData.title}</h1>
        <div className={utilStyles.lightText}>
          <div>
            {surfData[991].unit_type}: {surfData[991].value[0]} {surfData[991].unit_label}
          </div>
          <div>
            {surfData[993].unit_type}: {surfData[993].value[0]} {surfData[993].unit_label}
          </div>
          <div>
            {surfData[994].unit_type}: {surfData[994].value[0]} {surfData[994].unit_label}
          </div>
          <div>
            {surfData[1073].unit_type}: {surfData[1073].value[0]} {surfData[1073].unit_label}
          </div>
        </div>
      </article>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`https://api.manly.hydraulics.works/api.php?page=latest-readings&sitecode=SYDDOW&username=publicwww&token=KzZQWmJFbWZzRGVXYWdVTVpYQUpFdEpvTFh6NmdFMGtWSWExRjJmOGNjSDBjQ2ZvVjJINUROM2lTd3JndlBRbjNKNFRtdXdvVGorWXkxRmZ3UGFBN2xBV2QxUCs3M3VGV2M3SEFOamJDMlhzNk9yOHRrZlI1bGo0RE9DOVBoanlieEJTekk3Y3EwR2lRTXV1QnlZSTRDWXhCUGlndmZDZlRWaU12bHBUVXp3N3VyREF2bW9wOXdCR3RMeGZxelB1L1ZBUUxZR1F1ZTZ3Y1M5YkhQeTJDbU52ZXF5U1lkZ3FGUWgrOUlxV1Q1Mk5zTGRhMHBtL09jVlB1ZEROOVM4OVl1d1RrOWZmTk9qNWNqR0ZYeDREeGgxc053QUVPTGM4MmRLOVNtd1JGYk9QeDN6YldZY2Q2RndUcUpvWXpGaTY%3D`)
  const surfData = await res.json()

  if (!surfData) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      surfData
    }
  }
}
