'use client'
import styles from '../app/styles.module.css';
import Picture1 from '@/../public/zoom/1.jpg';
import Picture2 from '@/../public/zoom/2.jpg';
import Picture3 from '@/../public/zoom/3.jpg';
import Picture4 from '@/../public/zoom/4.jpg'
import Picture5 from '@/../public/zoom/5.jpg'
import Picture6 from '@/../public/zoom/6.jpg'
import Picture7 from '@/../public/zoom/7.jpeg'
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function ZommParallax() {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: Picture1,
      scale: scale4
    },
    {
      src: Picture2,
      scale: scale5
    },
    {
      src: Picture3,
      scale: scale6
    },
    {
      src: Picture4,
      scale: scale5
    },
    {
      src: Picture5,
      scale: scale6
    },
    {
      src: Picture6,
      scale: scale8
    },
    {
      src: Picture7,
      scale: scale9
    }
  ]

  return (
    <div ref={container} className={`${styles.container} mb-11`}>
      <div className={styles.sticky}>
        {
          pictures.map(({ src, scale }, index) => {
            return <motion.div key={index} style={{ scale }} className={styles.el}>
              <div className={`${styles.imageContainer} rounded-3xl`}>
                <Image
                  className='rounded-3xl'
                  src={src}
                  fill
                  alt="image"
                  placeholder='blur'
                />
              </div>
            </motion.div>
          })
        }
      </div>
    </div>
  )
}