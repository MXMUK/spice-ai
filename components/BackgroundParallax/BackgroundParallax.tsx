import React, { FC } from 'react';

import { motion, MotionValue } from 'framer-motion';
import Image from 'next/image';

import planetImg from '@/public/images/planet.png';
import redShapeImg from '@/public/images/backgroundShapes/redShape.png';
import blueShapeImg from '@/public/images/backgroundShapes/blueShape.png';

interface Props {
  backgroundY: MotionValue<string>;
}

const BackgroundParallax: FC<Props> = ({ backgroundY }) => {
  return (
    <motion.div style={{ y: backgroundY }} className="fixed h-screen inset-0 -z-50">
      <Image
        src={blueShapeImg}
        width={1100}
        height={850}
        className="absolute z-10 top-0 -translate-y-1/3"
        alt="blue shape"
      />

      <Image
        src={redShapeImg}
        width={1100}
        height={850}
        className="absolute z-10 -left-60 bottom-0 translate-y-2/3"
        alt="red shape"
      />

      <Image src={planetImg} className="absolute top-1/5 right-0" alt="Picture of the planet" />
    </motion.div>
  );
};

export default BackgroundParallax;
