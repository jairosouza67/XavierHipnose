import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    className?: string;
    key?: string | number;
}

const AnimatedSection = ({
    children,
    delay = 0,
    direction = 'up',
    className = '',
}: AnimatedSectionProps) => {
    const directions = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 },
        none: { scale: 0.95 },
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...(direction !== 'none' ? directions[direction] : { scale: 0.95 })
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.7,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;
