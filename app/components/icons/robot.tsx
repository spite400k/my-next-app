// components/RobotFace.tsx
import { motion } from 'framer-motion';

const RobotFace = () => {
  return (
    <motion.div
      className="w-16 h-16 bg-gray-500 rounded flex items-center justify-center relative"
    >
      {/* 左目 */}
      <motion.div
            className="absolute top-4 left-3 w-3 h-3 bg-white rounded-full"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}>
         
        </motion.div>
      {/* 右目 */}
      <motion.div
            className="absolute top-4 right-3 w-3 h-3 bg-white rounded-full"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}>
         
        </motion.div>
      {/* 口 */}
      <div className="absolute bottom-4 w-8 h-2 bg-white rounded-md"></div>
    </motion.div>
  );
};

export default RobotFace;
