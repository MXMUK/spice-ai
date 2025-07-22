import {
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  motion,
  wrap,
  MotionValue,
} from 'motion/react';

import SolanaLogo from '@/public/images/solanaLogo.png';
import ArweareLogo from '@/public/images/arweareLogo.png';
import BittensonLogo from '@/public/images/bittensonLogo.png';
import RedLogo from '@/public/images/redLogo.png';
import TelegramLogo from '@/public/images/telegramLogo.png';

import Image from 'next/image';

interface ParallaxProps {
  scrollY: MotionValue<number>;
}

function ParallaxText({ scrollY }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * This is a magic wrapping for the length of the image - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -40, v)}%`);

  useAnimationFrame((t, delta) => {
    let moveBy = (-1 * velocityFactor.get()) / 100;

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -40%
   */
  return (
    <div className="overflow-hidden flex flex-nowrap">
      <motion.div className="flex gap-32 translate-x-[40%]" style={{ x }}>
        <div className='flex items-center justify-center'>
          <Image src={SolanaLogo} width={334} height={50} alt="solana logo" />
        </div>

        <div className='flex items-center justify-center'>
          <Image src={ArweareLogo} alt="arweare logo" />
        </div>

        <div className='flex items-center justify-center'>
          <Image src={BittensonLogo} alt="bittenson logo" />
        </div>

        <div className='flex items-center justify-center'>
          <Image src={RedLogo} alt="red logo" />
        </div>

        <div className='flex items-center justify-center'>
          <Image src={TelegramLogo} alt="telegram logo" />
        </div>
      </motion.div>
    </div>
  );
}

export default ParallaxText;
