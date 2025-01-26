// components/ColorfulRobotFace.tsx
import { motion } from 'framer-motion';

const ColorfulRobotFace = () => {
  return (
    <motion.div
      className="w-16 h-12 rounded flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #65c7f7, #0052d4)',
      }}
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
      }}
      transition={{
        duration: 8, // グラデーションのアニメーション時間
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* 左目 */}
      <motion.div
        className="absolute top-3 left-4 w-3 h-3 rounded-full border-2 border-white bg-red-500"
        animate={{
          scaleY: [1, 0.1, 1, 1, 0.1, 1], // 瞬き2回
        }}
        transition={{
          duration: 8, // 全体のアニメーション時間
          repeat: Infinity, // 無限ループ
          times: [0, 0.05, 0.1, 0.6, 0.65, 0.7], // タイミングを調整
          ease: 'easeInOut',
        }}
      ></motion.div>

      {/* 右目 */}
      <motion.div
        className="absolute top-3 right-4 w-3 h-3 rounded-full border-2 border-white bg-red-500"
        animate={{
          scaleY: [1, 0.1, 1, 1, 0.1, 1], // 瞬き2回
        }}
        transition={{
          duration: 8, // 全体のアニメーション時間
          repeat: Infinity, // 無限ループ
          times: [0, 0.05, 0.1, 0.6, 0.65, 0.7], // タイミングを調整
          ease: 'easeInOut',
        }}
      ></motion.div>

      {/* 笑顔の口 */}
      <motion.div
        className="absolute bottom-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 rounded-full border border-white bg-red-500"
        style={{
          width: '13px',
          height: '13px',
          borderTopLeftRadius: '14px',
          borderTopRightRadius: '14px',
        }}
        animate={{
          scaleX: [1, 1.2, 1],
          scaleY: [1, 0.5, 1],
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

export default ColorfulRobotFace;
