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
            animate={{
              scaleY: [1, 0.1, 1, 1, 0.1, 1], // 瞬き2回
            }}
            transition={{
              duration: 8, // 全体のアニメーション時間
              repeat: Infinity, // 無限ループ
              times: [0, 0.05, 0.1, 0.6, 0.65, 0.7], // タイミングを調整
              ease: 'easeInOut',
            }}
            >
         
        </motion.div>
      {/* 右目 */}
      <motion.div
            className="absolute top-4 right-3 w-3 h-3 bg-white rounded-full"
            animate={{
              scaleY: [1, 0.1, 1, 1, 0.1, 1], // 瞬き2回
            }}
            transition={{
              duration: 8, // 全体のアニメーション時間
              repeat: Infinity, // 無限ループ
              times: [0, 0.05, 0.1, 0.6, 0.65, 0.7], // タイミングを調整
              ease: 'easeInOut',
            }}
            >
         
        </motion.div>
      {/* 口 */}
      <motion.div
        className="absolute bottom-4 bg-white rounded-full"
        style={{
          width: '20px',
          height: '10px',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
        }}
        animate={{
          scaleX: [1, 1.2, 1], // 横幅を広げる動き
          scaleY: [1, 0.5, 1], // 高さを縮める動き
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 4, // 瞬きと同期して4秒後に笑顔を切り替え
          ease: 'easeInOut',
        }}
      ></motion.div>
    </motion.div>
  );
};

export default RobotFace;
