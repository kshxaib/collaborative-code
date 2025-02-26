import { useEffect, useState } from "react"
import FormComponent from "@/components/forms/FormComponent"
import { motion } from "framer-motion"
import { Highlight, themes } from "prism-react-renderer"

export default function HomePage() {
    const [mounted, setMounted] = useState(false)
    const [text, setText] = useState("")
    const fullText = `OverClockers has developed a collaborative code compiler that features real-time chat, an interactive whiteboard, and support for a wide range of programming languages, making it a powerful tool for seamless coding and collaboration.`

    useEffect(() => {
        setMounted(true)
        if (mounted) {
            let i = 0
            const typingInterval = setInterval(() => {
                setText(fullText.slice(0, i))
                i++
                if (i > fullText.length) {
                    clearInterval(typingInterval)
                }
            }, 50)
            return () => clearInterval(typingInterval)
        }
    }, [mounted])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 p-4 sm:p-8">
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto flex w-full max-w-6xl flex-col items-center justify-evenly gap-12 rounded-2xl bg-gray-800 bg-opacity-50 p-7 shadow-2xl backdrop-blur-sm lg:flex-row"
            >
                <div className="flex w-full flex-col items-center justify-center lg:w-1/2">
                    <h1 className="mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-center text-4xl font-extrabold text-transparent md:text-5xl">
                    OverClockers
                    </h1>
                    <div className="aspect-video w-full max-w-md overflow-hidden rounded-lg bg-gray-900 shadow-inner">
                        <Highlight
                            theme={themes.nightOwl}
                            code={text}
                            language="javascript"
                        >
                            {({
                                className,
                                style,
                                tokens,
                                getLineProps,
                                getTokenProps,
                            }) => (
                                <pre
                                    className={`${className} h-full overflow-auto whitespace-pre-wrap p-4 font-mono text-sm md:text-base`}
                                    style={style}
                                >
                                    {tokens.map((line, i) => (
                                        <div
                                            key={i}
                                            {...getLineProps({ line, key: i })}
                                        >
                                            {line.map((token, key) => (
                                                <span
                                                    key={key}
                                                    {...getTokenProps({
                                                        token,
                                                        key,
                                                    })}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </pre>
                            )}
                        </Highlight>
                    </div>
                </div>
                <div className="flex w-full items-center justify-center lg:w-1/2">
                    <FormComponent />
                </div>
            </motion.main>
        </div>
    )
}
