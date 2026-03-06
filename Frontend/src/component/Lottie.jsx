import { motion } from "motion/react";
import Lottie from "lottie-react";

export default function LottieAnimation({ animation,  loop = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
     whileInView={{ opacity: 1, scale: 1.5 }}
      transition={{ duration: 0.9 , delay : 0.4}}
      className="flex  justify-center  w-50 h-40 overflow-hidden items-center"
    >
      <Lottie 
        animationData={animation}
        loop={loop}
        
      />
      
    </motion.div>
  );
}

