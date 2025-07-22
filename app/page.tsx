'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  stagger,
  useAnimate,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from 'motion/react';

import BackgroundParallax from '@/components/BackgroundParallax/BackgroundParallax';
import Button from '@/hoc/Button/Button';
import clsx from 'clsx';
import ParallaxText from '@/components/ParallaxText/ParallaxText';

export default function Home() {
  const ref = useRef(null);
  const heroInfo = useRef(null);

  const { scrollYProgress, scrollY } = useScroll({
    container: ref,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  const [heroInfoChild, animate] = useAnimate();
  const isInView = useInView(heroInfo);

  useEffect(() => {
    const elements = heroInfoChild.current.querySelectorAll(':scope > div');

    if (isInView) {
      animate(
        elements,
        { opacity: 1, y: -126 - 190 },
        { duration: 0.6, ease: 'easeInOut', delay: stagger(0.05) }
      );
    } else {
      animate(
        elements,
        { y: 0, opacity: 0 },
        { duration: 0.6, ease: 'easeInOut', delay: stagger(0.05) }
      );
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="h-screen snap-y overflow-auto snap-mandatory text-2xl font-inter relative">
      <BackgroundParallax backgroundY={backgroundY} />

      <div className="h-[316px] snap-center relative z-10 container">
        <div className="sticky top-8 w-full font-medium text-lg flex justify-center gap-12">
          <Button height={54}>LLM Leaderboard</Button>

          <Button height={54} variant="gradientBorder" className='px-8'>
            Buy Spice AI
          </Button>
        </div>
      </div>

      <div className="h-[calc(100vh-316px)] snap-center px-20 container">
        <h1
          className={clsx(
            'transition-colors duration-[.6s] font-medium font-spaceGrotesk text-9xl bg-gradient-to-br from-[#963488] via-[#FC6F32] to-[#FF4A59] text-transparent bg-clip-text',
            { 'from-[#FFD6F9] via-[#FFCBB4] to-[#FFBEC3]': isInView }
          )}>
          A new economic primitive for funding decentralized AI
        </h1>

        <h2 className="mt-9">
          We track, rank and pay for the best open source decentralized LLMs to compete against
          OpenAI
        </h2>

        <div className="flex gap-6 mt-9 font-medium">
          <Button height={75} variant="gradientBorder" className='px-12'>
            Buy Salt AI
          </Button>

          <Button height={75}>Try Now</Button>
        </div>
      </div>

      <motion.div ref={heroInfo} className="mt-[1px] container">
        <motion.div
          ref={heroInfoChild}
          className="translate-y-full grid grid-cols-3 gap-8 px-20 place-items-center text-center">
          <div className="p-8 rounded-[91px] bg-gradient-to-br w-full from-[#963488]/25 via-[#FC6F32]/25 to-[#FF4A59]/25">
            <div className=" font-bold text-[64px]">1,873</div>

            <h3 className="">LLM models</h3>
          </div>
          <div className="p-8 rounded-[91px] bg-gradient-to-br w-full from-[#963488]/25 via-[#FC6F32]/25 to-[#FF4A59]/25">
            <div className=" font-bold text-[64px]">$326,734</div>

            <h3 className="">Paid to data scientists</h3>
          </div>
          <div className="p-8 rounded-[91px] bg-gradient-to-br w-full from-[#963488]/25 via-[#FC6F32]/25 to-[#FF4A59]/25">
            <div className=" font-bold text-[64px]">6,557</div>

            <h3 className="">Developers</h3>
          </div>
        </motion.div>
      </motion.div>

      <div className="h-screen snap-center flex items-center mt-[100px]">
        <div className="w-full">
          <h3 className="container font-medium text-center font-spaceGrotesk text-[64px]">
            Projects integrated into the Arrakis AI Ecosystem
          </h3>

          <ParallaxText scrollY={scrollY} />
        </div>
      </div>

      <div className="h-screen snap-center flex items-center container">
        <div className="flex flex-col gap-8 w-2/3">
          <h4 className="font-medium font-spaceGrotesk text-[64px]">
            Crowdsourcing our collective intelligence to build the best AI
          </h4>

          <p>
            Open source AI has been lagging behind the likes of Google and OpenAI by billions of
            dollars. <br />
            <br /> Salt aims to solve that by rewarding open source developers who contribute to the
            democratization of AI. We run competitions between AI models to find and reward the best
            AI models. As a result, our users will be able to access the latest cutting edge AI
            models.
          </p>

          <div>
            <Button className="mt-8 font-medium" height={75} variant="gradientBorder">
              Use The Cutting Edge AI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

