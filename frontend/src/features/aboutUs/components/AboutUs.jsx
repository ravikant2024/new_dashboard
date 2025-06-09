import React, { useEffect } from 'react';
import './AboutUs.css';

const AboutUs = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])
    return (
        <div className="about-us-container">

            <div className="About-content">
                <h1>About us</h1>
                <p>The fact that you are here definitely means that you are curious to know more about us and being one of the founders of Original Innovation LLP it’s an honor to tell you all.</p>
                <p>The obvious question is why Original Innovation LLP? It’s a very common and important question. I ask this to myself every day. Why we started this company?</p>
                <p>To answer this we’ll have to go back to 2024. We were fresh graduates from engineering & had good offers from different companies. We started our careers with decent packages and everything seems to be going well. But then we realized that something is missing, warming, honesty, and relentless dedication was just short. We felt right. We came back from our phones and asked each other do we really want to do this?</p>
                <p>Finally, after a year, we gave our answer in a YES. This was the time to commence our struggles. We somehow decided that we will make our own venture. We tried making prototypes, making presentations. We struggled for 2 long years and finally, we reached a dead end. No market, No money, No type of guiding person, and with limited resources, the pressure from our families…...the list is endless.</p>
                <p>We decided not to stop making progress. But then our dream of doing something hands-on was still alive. We gave ourselves to the different jobs which are coming our way. Sourcing, trading, retailing, designing, branding, everything that we could do. Thereby, we tried to reduce our financial crises.</p>
                <p>During that while, we came across many students, individuals & many other organizations which needed various hardware products. These products are not commonly available in India and even if available are not of decent quality. We tried to find a solution to this and somehow came to know that we are here to make it effective and helpful for you to celebrate your milestone.</p>
                <p>This was our Eureka Moment.</p>
                <p>It took a lot of planning and some hard-earned money. Original Innovation LLP is a venture of Original Innovation LLP Innovation, a one-stop solution for all kinds of Electronic hardware components, Robotics, and various DIY projects.</p>
                <p>But, getting 1000s to position it is not an easy walk. It took a lot of challenges. But those 1 long years of struggles helped us immensely to reach Original Innovation LLP from a dream to what it is today.</p>
                <p>Today, India is taking giant leaps forward. Innovation is at the forefront & the people who are making it happen are heroes and pioneers. Original Innovation LLP wants to support and appreciate this Maker’s Revolution and play a part.</p>
                <p>I would end this by a few lines by Robert Frost which perfectly depicts our journey so far.</p>
              
            </div>
        </div>
    );
};

export default AboutUs;