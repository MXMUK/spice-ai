import {
  useAnimationFrame,
  useSpring,
  useTransform,
  useVelocity,
  motion,
  MotionValue,
  useAnimation,
} from 'motion/react';

import SolanaLogo from '@/public/images/solanaLogo.png';
import ArweareLogo from '@/public/images/arweareLogo.png';
import BittensonLogo from '@/public/images/bittensonLogo.png';
import RedLogo from '@/public/images/redLogo.png';
import TelegramLogo from '@/public/images/telegramLogo.png';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface ParallaxProps {
  scrollY: MotionValue<number>;
  isInView: boolean;
}

function ParallaxHorizontal({ scrollY, isInView }: ParallaxProps) {
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const directionFactor = useRef<number>(1);
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const controls = useAnimation();

  useAnimationFrame((t, delta) => {
    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
  });

  useEffect(() => {
    if (velocityFactor.get() < 0 && isInView) {
      controls.start({
        x: ['100%', '0%'],
        transition: { type: 'spring', stiffness: 400, damping: 30, duration: 0.5 },
      });
    } else if (velocityFactor.get() > 0 && isInView) {
      controls.start({
        x: ['-100%', '0%'],
        transition: { type: 'spring', stiffness: 400, damping: 30, duration: 0.5 },
      });
    } else if (velocityFactor.get() < 0 && !isInView) {
      controls.start({
        x: ['0%', '-100%'],
        transition: { type: 'spring', stiffness: 400, damping: 30, duration: 0.5 },
      });
    } else if (velocityFactor.get() > 0 && !isInView) {
      controls.start({
        x: ['0%', '100%'],
        transition: { type: 'spring', stiffness: 400, damping: 30, duration: 0.5 },
      });
    }
  }, [isInView, velocityFactor, controls]);

  return (
    <div className="mx-auto overflow-auto lg:overflow-hidden">
      <motion.div className="flex gap-32 w-[1536px] lg:w-full justify-center mx-auto" animate={controls}>
        <div className="flex items-center justify-center">
          <Image src={SolanaLogo} width={334} height={50} alt="solana logo" />
        </div>

        <div className="flex items-center justify-center">
          <Image src={ArweareLogo} alt="arweare logo" />
        </div>

        <div className="flex items-center justify-center">
          <Image src={BittensonLogo} alt="bittenson logo" />
        </div>

        <div className="flex items-center justify-center">
          <Image src={RedLogo} alt="red logo" />
        </div>

        <div className="flex items-center justify-center">
          <Image src={TelegramLogo} alt="telegram logo" />
        </div>
      </motion.div>
    </div>
  );
}

export default ParallaxHorizontal;
