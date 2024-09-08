'use client';

import { useEffect, useRef } from 'react';
import styles from './emoji-background.module.css';

const EmojiBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const emojis: string[] = [
    '💸',
    '💰',
    '💵',
    '💶',
    '💷',
    '💴',
    '🤑',
    '📈',
    '📉',
    '🚀',
    '💳',
    '💎',
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createEmoji = () => {
      const emoji = document.createElement('div');
      emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.className = styles.emoji;
      emoji.style.fontSize = `${Math.random() * 50 + 50}px`;
      emoji.style.top = `${Math.random() * 100}vh`;
      emoji.style.left = `${Math.random() * 100}vw`;

      // Set initial styles to trigger reflow
      emoji.style.transform = 'translate(0, 0)';
      emoji.style.opacity = '0';
      container.appendChild(emoji);

      // Force reflow
      emoji.offsetHeight;

      // Apply the animation
      const movementX = Math.random() * 200 - 100; // Random horizontal movement
      const movementY = Math.random() * 200 - 100; // Random vertical movement
      emoji.style.transform = `translate(${movementX}px, ${movementY}px)`;
      emoji.style.opacity = '1';

      // Fade out and remove emoji
      setTimeout(() => {
        try {
          if (container && container.contains(emoji)) {
            emoji.style.opacity = '0';
            setTimeout(() => {
              try {
                if (container && container.contains(emoji)) {
                  container.removeChild(emoji);
                }
              } catch (error) {
                console.error('Error during emoji removal:', error);
              }
            }, 2000);
          }
        } catch (error) {
          console.error('Error during emoji fade out:', error);
        }
      }, 3000);
    };

    // Frequency of emoji creation
    const interval = setInterval(createEmoji, 750);

    return () => {
      clearInterval(interval);
      const emojiElements = container?.querySelectorAll(`.${styles.emoji}`);
      emojiElements?.forEach((emoji) => {
        if (container && container.contains(emoji)) {
          container.removeChild(emoji);
        }
      });
    };
  }, [emojis]);

  return <div ref={containerRef} className={styles.container}></div>;
};

export default EmojiBackground;
