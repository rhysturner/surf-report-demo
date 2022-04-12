import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

export default function PKSurf({ surfData, weatherData }) {
  return (
    <Layout>
      <Head>
        <title>
          Surf Report
        </title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{surfData.title}</h1>
        <h1 className={utilStyles.headingXl}>{weatherData.location.name}</h1>
        <div className={utilStyles.lightText}>
          <div>
            {surfData[1033].unit_type}: {surfData[1033].value[0]} {surfData[1033].unit_label}
          </div>
          <div>
            {surfData[1035].unit_type}: {surfData[1035].value[0]}&#176;
          </div>
          <div>
            {surfData[1036].unit_type}: {surfData[1036].value[0]} {surfData[1036].unit_label}
          </div>
          <div>
            {surfData[1076].unit_type}: {surfData[1076].value[0]}&#8451;
          </div>
          <div>
            <div>
              Temp: {weatherData.current.temperature} &#8451;
            </div>
            <div>
              UV Index: {weatherData.current.uv_index}
            </div>
            <div>
              cloudcover: {weatherData.current.cloudcover}
            </div>
            <div>
              humidity: {weatherData.current.humidity}
            </div>
            <div>
              observation time: {weatherData.current.observation_time}
            </div>
            <div>
              local time: {weatherData.location.localtime}
            </div>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`https://api.manly.hydraulics.works/api.php?page=latest-readings&sitecode=PTKMOW&username=publicwww&token=KzZQWmJFbWZzRGVXYWdVTVpYQUpFdEpvTFh6NmdFMGtWSWExRjJmOGNjSDBjQ2ZvVjJINUROM2lTd3JndlBRbjNKNFRtdXdvVGorWXkxRmZ3UGFBN2xBV2QxUCs3M3VGV2M3SEFOamJDMlhzNk9yOHRrZlI1bGo0RE9DOVBoanlieEJTekk3Y3EwR2lRTXV1QnlZSTRDWXhCUGlndmZDZlRWaU12bHBUVXp3N3VyREF2bW9wOXdCR3RMeGZxelB1L1ZBUUxZR1F1ZTZ3Y1M5YkhQeTJDbU52ZXF5U1lkZ3FGUWgrOUlxV1Q1Mk5zTGRhMHBtL09jVlB1ZEROOVM4OVl1d1RrOWZmTk9qNWNqR0ZYeDREeGgxc053QUVPTGM4MmRLOVNtd1JGYk9QeDN6YldZY2Q2RndUcUpvWXpGaTY%3D`)
  const surfData = await res.json()

  const res2 = await fetch(`http://api.weatherstack.com/current?access_key=52c1449e998dc959a5006942caa57af1&query=Port Kembla`)
  const weatherData = await res2.json()

  if (!surfData) {
    return {
      notFound: true,
    }
  }

  if (!weatherData) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      surfData,
      weatherData
    },
    revalidate: 1,
  }
}
