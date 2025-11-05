"use client";

/**
 * @author: @dorian_baffier
 * @description: Dynamic Text
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Greeting {
    text: string;
    language: string;
}

const defaultGreetings: Greeting[] = [
    { text: "Hello", language: "English" },
    { text: "こんにちは", language: "Japanese" },
    { text: "Bonjour", language: "French" },
    { text: "Hola", language: "Spanish" },
    { text: "안녕하세요", language: "Korean" },
    { text: "Ciao", language: "Italian" },
    { text: "Hallo", language: "German" },
    { text: "こんにちは", language: "Japanese" },
];

interface DynamicTextProps {
    texts?: string[];
    className?: string;
    interval?: number;
    showDot?: boolean;
}

const DynamicText = ({ 
    texts, 
    className = "text-2xl font-medium text-gray-800 dark:text-gray-200",
    interval = 300,
    showDot = true
}: DynamicTextProps) => {
    const displayTexts = texts || defaultGreetings.map(g => g.text);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        if (!isAnimating) return;

        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;

                if (nextIndex >= displayTexts.length) {
                    clearInterval(intervalId);
                    setIsAnimating(false);
                    return prevIndex;
                }

                return nextIndex;
            });
        }, interval);

        return () => clearInterval(intervalId);
    }, [isAnimating, displayTexts.length, interval]);

    // Animation variants for the text
    const textVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: -100, opacity: 0 },
    };

    return (
        <span className="relative inline-flex items-center">
            {isAnimating ? (
                <AnimatePresence mode="wait">
                    <motion.span
                        key={currentIndex}
                        className={className}
                        aria-live="off"
                        initial={textVariants.hidden}
                        animate={textVariants.visible}
                        exit={textVariants.exit}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        {showDot && (
                            <span
                                className="inline-block h-2 w-2 rounded-full bg-current mr-2"
                                aria-hidden="true"
                            />
                        )}
                        {displayTexts[currentIndex]}
                    </motion.span>
                </AnimatePresence>
            ) : (
                <span className={className}>
                    {showDot && (
                        <span
                            className="inline-block h-2 w-2 rounded-full bg-current mr-2"
                            aria-hidden="true"
                        />
                    )}
                    {displayTexts[currentIndex]}
                </span>
            )}
        </span>
    );
};

export default DynamicText;
