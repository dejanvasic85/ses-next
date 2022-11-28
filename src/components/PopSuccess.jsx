import React from 'react';
import classNames from 'class-names';
import { motion } from 'framer-motion';

import { Icon } from './Icon/Icon';

export function PopSuccess({ children, show }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: show ? 1 : 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className={classNames(
        'flex items-start md:items-center text-white text-sm md:text-base rounded-lg mx-auto gap-1 p-4 bg-success justify-center',
      )}
    >
      <Icon size="lg" name="tick-circle" />
      <span>{children}</span>
    </motion.div>
  );
}
