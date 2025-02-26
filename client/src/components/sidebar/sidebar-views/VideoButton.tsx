// import ChatInput from "@/components/chats/ChatInput";
// import ChatList from "@/components/chats/ChatList";
// import useResponsive from "@/hooks/useResponsive";
// import { motion } from "framer-motion";
// import { Video } from "lucide-react";

// export default function ChatsView() {
//     const { viewHeight } = useResponsive();

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//             className="flex max-h-full min-h-[400px] w-full flex-col gap-4 p-6 bg-gray-900 bg-opacity-75 backdrop-blur-md rounded-lg shadow-xl"
//             style={{ height: viewHeight }}
//         >
//             <div className="flex justify-between items-center">
//                 <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
//                     Group Chat
//                 </h1>
//                 <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 transition rounded-lg shadow-md"
//                     onClick={() => alert("Starting video call...")} // Replace with your actual video call logic
//                 >
//                     <Video className="w-5 h-5" />
//                     Video Call
//                 </motion.button>
//             </div>
//             <ChatList />
//             <ChatInput />
//         </motion.div>
//     );
// }
