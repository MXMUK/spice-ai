'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  stagger,
  useAnimate,
  useInView,
  useScroll,
  useTransform,
} from 'motion/react';

import clsx from 'clsx';
import Image from 'next/image';

import earthImg from '@/public/images/earth.png';
import moonImg from '@/public/images/moon.png';
import TelegramLogo from '@/public/images/telegramLogo.png';
import XLogo from '@/public/images/XLogo.png';

import Button from '@/hoc/Button/Button';
import ParallaxHorizontal from '@/components/ParallaxHorizontal/ParallaxHorizontal';
import BackgroundParallax from '@/components/BackgroundParallax/BackgroundParallax';

export default function Home() {
  const ref = useRef(null);
  const heroInfo = useRef(null);
  const horizontalParallaxSection = useRef(null);

  const { scrollYProgress, scrollY } = useScroll({
    container: ref,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  const [heroInfoChild, animate] = useAnimate();
  const isInView = useInView(heroInfo);
  const isHorizontalParallaxInView = useInView(horizontalParallaxSection, { amount: 0.9 });

  useEffect(() => {
    const elements = heroInfoChild.current.querySelectorAll(':scope > div');

    if (isInView) {
      animate(
        elements,
        // { opacity: 1, y: -126 - 190 },
        { opacity: 1, y: 'var(--hero-footer-height)' },
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
      className="h-screen snap-y overflow-auto snap-mandatory md:text-xl 2xl:text-2xl font-inter relative">
      <BackgroundParallax scrollY={scrollY} backgroundY={backgroundY} />

      <div className="h-52 md:h-[316px] snap-center relative z-10 container">
        <div className="sticky top-8 w-full font-medium text-lg flex justify-center gap-2 md:gap-12 flex-wrap">
          <Button className='px-2 md:px-8' height={54}>LLM Leaderboard</Button>

          <Button height={54} variant="gradientBorder" className="px-2 md:px-8">
            Buy Spice AI
          </Button>
        </div>
      </div>

      <div className="h-[calc(100vh-208px)] md:h-[calc(100vh-316px)] snap-center mx-4 container">
        <h1
          className={clsx(
            'transition-colors duration-[.6s] font-medium font-spaceGrotesk text-4xl md:text-5xl xl:text-7xl 2xl:text-9xl bg-gradient-to-br from-[#963488] via-[#FC6F32] to-[#FF4A59] text-transparent bg-clip-text',
            { 'from-[#FFD6F9] via-[#FFCBB4] to-[#FFBEC3]': isInView }
          )}>
          A new economic primitive for funding decentralized AI
        </h1>

        <h2 className="mt-9">
          We track, rank and pay for the best open source decentralized LLMs to compete against
          OpenAI
        </h2>

        <div className="flex gap-6 mt-9 font-medium justify-center md:justify-start flex-wrap">
          <Button height={75} variant="gradientBorder" className="px-4 md:px-12">
            Buy Salt AI
          </Button>

          <Button className="px-4 md:px-12" height={75}>
            Try Now
          </Button>
        </div>
      </div>

      <motion.div
        ref={heroInfo}
        className="mt-[1px] container [--hero-footer-height:-100%] md:[--hero-footer-height:-150%]">
        <motion.div
          ref={heroInfoChild}
          className="translate-y-full grid grid-cols-3 gap-2 md:gap-8 place-items-center text-center">
          <div className="p-1 md:p-8 rounded-[91px] bg-gradient-to-br w-full from-[#963488]/25 via-[#FC6F32]/25 to-[#FF4A59]/25">
            <div className="font-bold text-sm md:text-2xl xl:text-4xl 2xl:text-6xl">1,873</div>

            <h3 className="text-[8px] md:text-base">LLM models</h3>
          </div>

          <div className="p-1 md:p-8 rounded-[91px] bg-gradient-to-br w-full from-[#963488]/25 via-[#FC6F32]/25 to-[#FF4A59]/25">
            <div className="font-bold text-sm md:text-2xl xl:text-4xl 2xl:text-6xl">$326,734</div>

            <h3 className="text-[8px] md:text-base">Paid to data scientists</h3>
          </div>

          <div className="p-1 md:p-8 rounded-[91px] bg-gradient-to-br w-full from-[#963488]/25 via-[#FC6F32]/25 to-[#FF4A59]/25">
            <div className="font-bold text-sm md:text-2xl xl:text-4xl 2xl:text-6xl">6,557</div>

            <h3 className="text-[8px] md:text-base">Developers</h3>
          </div>
        </motion.div>
      </motion.div>

      <div
        ref={horizontalParallaxSection}
        className="h-screen snap-center flex items-center mt-[100px]">
        <div className="w-full">
          <h3 className="container font-medium text-centerfont-spaceGrotesk text-lg md:text-2xl xl:text-4xl 2xl:text-6xl mb-10 text-center">
            Projects integrated into the Arrakis AI Ecosystem
          </h3>

          <ParallaxHorizontal isInView={isHorizontalParallaxInView} scrollY={scrollY} />
        </div>
      </div>

      <div className="h-screen snap-center flex items-center container">
        <div className="flex flex-col gap-8 md:w-2/3">
          <h4 className="font-mediumfont-spaceGrotesk text-lg md:text-2xl xl:text-4xl 2xl:text-6xl">
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
            <Button className="mt-8 px-12 font-medium" height={75} variant="gradientBorder">
              Use The Cutting Edge AI
            </Button>
          </div>
        </div>
      </div>

      <div className=" h-screen snap-center flex items-center relative">
        <div className="container flex">
          <div className="flex flex-col gap-8 w-2/3">
            <h4 className="font-mediumfont-spaceGrotesk text-lg md:text-2xl xl:text-4xl 2xl:text-6xl">
              Join our community
            </h4>

            <p>
              Join us on our mission to to the moon & revolutionize open source AI development so
              that we can build a permissionless, democratized, and decentralized AI.
              <br /> <br />
              Let the fate of AI be in our hands and not that of big tech companies.
            </p>

            <div className="flex gap-8">
              <Image width={64} height={64} src={TelegramLogo} alt="telegram logo" />

              <Image width={64} height={64} src={XLogo} alt="X logo" />
            </div>
          </div>

          <div className="w-1/3 flex justify-center items-center">
            <Image src={moonImg} className="" alt="Picture of the moon" />
          </div>
        </div>

        <Image src={earthImg} className="absolute bottom-0 w-full" alt="Picture of the earth" />
      </div>
    </div>
  );
}

