import React from 'react'
import AppContainer from './AppContainer'
import styles from './app.module.css'


export default function App() {
  return (
    <>
        <div className={styles.leftShape}></div>
        <div className={styles.rightShape}></div>
        <AppContainer className={styles.appContainer}/>
    </>
  )
}
