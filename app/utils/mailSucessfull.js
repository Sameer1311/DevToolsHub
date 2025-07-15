import { CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Successfully = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg backdrop-blur-sm border border-green-400"
        >
          <CheckCircle className="w-5 h-5 text-white" />
          <p className="text-sm font-medium">Your message was sent successfully!</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Successfully;
