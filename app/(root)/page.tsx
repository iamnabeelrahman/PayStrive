import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {

  // Empowering you to master your finances and make smarter decisions.
  //Everything you need to stay on top of your financial life, all in one place.

  const loggedIn = {firstName: "Nabeel", lastName: "Rahman", email: "nabeel.r.work@gmail.com"}
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
          type="greeting"
          title="Welcome"
          user={loggedIn?.firstName || 'Guest'}
          subtext="Your gateway to seamless account and transaction management."/>
          <TotalBalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={72836.23}/>
        </header>

        RECENT TRANSACTIONS
      </div>
      <RightSidebar 
      user = {loggedIn}
      transactions = {[]}
      banks={[{ currentBalance:328.938}, {currentBalance: 8712.92}]}
      />
      
    </section>
  )
}

export default Home
