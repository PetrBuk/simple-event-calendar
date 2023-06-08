import SimpleCalendar from '@project/components/SimpleCalendar'

import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <SimpleCalendar />
    </main>
  )
}
