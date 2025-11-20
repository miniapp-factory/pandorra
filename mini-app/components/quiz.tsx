"use client";

import { useState } from "react";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

const animals = ["cat", "dog", "fox", "hamster", "horse"] as const;
type Animal = typeof animals[number];

const questions = [
  {
    question: "What is your favorite type of food?",
    options: [
      { text: "Meat", animal: "cat" as Animal },
      { text: "Fish", animal: "cat" as Animal },
      { text: "Berries", animal: "fox" as Animal },
      { text: "Seeds", animal: "hamster" as Animal },
      { text: "Grass", animal: "horse" as Animal },
    ],
  },
  {
    question: "Which activity do you enjoy most?",
    options: [
      { text: "Chasing mice", animal: "cat" as Animal },
      { text: "Playing fetch", animal: "dog" as Animal },
      { text: "Hunting in the woods", animal: "fox" as Animal },
      { text: "Nibbling on treats", animal: "hamster" as Animal },
      { text: "Running in fields", animal: "horse" as Animal },
    ],
  },
  {
    question: "What is your preferred living environment?",
    options: [
      { text: "Indoor cozy", animal: "cat" as Animal },
      { text: "Outdoor park", animal: "dog" as Animal },
      { text: "Forest", animal: "fox" as Animal },
      { text: "Small cage", animal: "hamster" as Animal },
      { text: "Open pasture", animal: "horse" as Animal },
    ],
  },
  {
    question: "How do you like to communicate?",
    options: [
      { text: "Purrs", animal: "cat" as Animal },
      { text: "Barks", animal: "dog" as Animal },
      { text: "Howls", animal: "fox" as Animal },
      { text: "Squeaks", animal: "hamster" as Animal },
      { text: "Neighs", animal: "horse" as Animal },
    ],
  },
  {
    question: "What is your favorite pastime?",
    options: [
      { text: "Sleeping", animal: "cat" as Animal },
      { text: "Playing", animal: "dog" as Animal },
      { text: "Hiding", animal: "fox" as Animal },
      { text: "Running in a wheel", animal: "hamster" as Animal },
      { text: "Galloping", animal: "horse" as Animal },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<Animal, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [shuffledOptions, setShuffledOptions] = useState(
    questions.map((q) => shuffleArray(q.options))
  );
  const [result, setResult] = useState<Animal | null>(null);

  const handleAnswer = (animal: Animal) => {
    setScores((prev) => ({ ...prev, [animal]: prev[animal] + 1 }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const maxScore = Math.max(...Object.values(scores));
      const topAnimals = Object.entries(scores)
        .filter(([, s]) => s === maxScore)
        .map(([a]) => a as Animal);
      setResult(topAnimals[0]); // pick first in case of tie
    }
  };

  const retake = () => {
    setCurrent(0);
    setScores({
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    });
    setShuffledOptions(questions.map((q) => shuffleArray(q.options)));
    setResult(null);
  };

  if (result) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold">
          You are most like a {result}!
        </h2>
        <img
          src={`/${result}.png`}
          alt={result}
          width={200}
          height={200}
          className="rounded"
        />
        <Share text={`I am a ${result}! Check out the quiz at ${url}`} />
        <button
          onClick={retake}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const q = questions[current];
  const opts = shuffledOptions[current];

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">{q.question}</h2>
      <div className="grid grid-cols-1 gap-2">
        {opts.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt.animal)}
            className="px-4 py-2 bg-secondary text-white rounded"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
