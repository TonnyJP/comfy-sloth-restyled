import React from 'react'
import styled from 'styled-components'
import aboutImg from '../assets/hero-bcg.jpeg'
import {PageHero} from '../components'

export const AboutPage = () => {
  return <main>
    <PageHero title ={"about"}/>
    <Wrapper className='page section section-center'>
      <img src={aboutImg} alt='nice desk' />
      <article>
        <div className='title'>
          <h2>Our story</h2>
          <div className='underline'/>
        </div>
        <p>
      Artisan chambray salvia mukbang, narwhal franzen pour-over stumptown tilde normcore. Enamel pin vape pork belly 
      jawn snackwave, mustache cliche slow-carb humblebrag kale chips solarpunk 3 wolf moon pickled ennui. DIY woke 
      try-hard, praxis chicharrones meditation selfies vexillologist subway tile. Jianbing activated charcoal whatever 
      blue bottle hoodie skateboard. Schlitz selfies roof party before they sold out, plaid shaman narwhal franzen tbh. 
      Tumblr DIY cold-pressed, pok pok bicycle rights typewriter fit skateboard thundercats fingerstache hoodie pitchfork.
      Health goth pickled cred tonx iPhone mixtape.
        </p>
      </article>

    </Wrapper>
  </main>
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
//export default AboutPage
