"use client";

import { useEffect, useState } from "react";

const TITLES = [
  "AI Researcher",
  "Robotics Engineer",
  "Idea-Chaser",
  "Builder",
  "NBA Couch Analyst",
];

const TYPE_DELAY = 70;
const DELETE_DELAY = 40;
const PAUSE_DELAY = 1_400;

export function Typewriter() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const title = TITLES[titleIndex]!;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!deleting && characterCount < title.length) {
        setCharacterCount((count) => count + 1);
      } else if (!deleting) {
        setDeleting(true);
      } else if (characterCount > 0) {
        setCharacterCount((count) => count - 1);
      } else {
        setDeleting(false);
        setTitleIndex((index) => (index + 1) % TITLES.length);
      }
    },
    !deleting && characterCount === title.length
      ? PAUSE_DELAY
      : deleting
        ? DELETE_DELAY
        : TYPE_DELAY);

    return () => window.clearTimeout(timer);
  }, [characterCount, deleting, title]);

  return (
    <p className="grid min-h-8 text-left text-2xl font-medium text-muted-foreground [overflow-wrap:anywhere] md:block md:[overflow-wrap:normal]" aria-live="off">
      {/* Reserve the tallest wrapped title on mobile throughout the animation. */}
      {TITLES.map((text) => (
        <span key={text} aria-hidden className="invisible col-start-1 row-start-1 min-w-0 md:hidden">
          {text}<span className="ml-0.5 inline-block">|</span>
        </span>
      ))}
      <span className="col-start-1 row-start-1 min-w-0">
        {title.slice(0, characterCount)}
        <span aria-hidden className="ml-0.5 inline-block animate-pulse text-foreground">
          |
        </span>
      </span>
    </p>
  );
}
