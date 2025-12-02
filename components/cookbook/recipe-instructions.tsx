"use client";

import { useState } from "react";
import { Timer, Play } from "lucide-react";
import type { Instruction } from "@/lib/recipe-types";

interface RecipeInstructionsProps {
  instructions: Instruction[];
}

export function RecipeInstructions({ instructions }: RecipeInstructionsProps) {
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (stepNumber: number) => {
    setCheckedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(stepNumber)) {
        newSet.delete(stepNumber);
      } else {
        newSet.add(stepNumber);
      }
      return newSet;
    });
  };

  const startTimer = (minutes: number, stepNumber: number) => {
    const milliseconds = minutes * 60 * 1000;

    // Create a simple browser notification/alert
    if ("Notification" in window && Notification.permission === "granted") {
      setTimeout(() => {
        new Notification("Timer Complete!", {
          body: `Step ${stepNumber}: ${minutes} minute timer is done!`,
          icon: "/favicon.ico",
        });
      }, milliseconds);
    } else {
      // Fallback to alert
      setTimeout(() => {
        alert(`Timer complete! Step ${stepNumber} (${minutes} minutes)`);
      }, milliseconds);
    }

    // Request notification permission if not already granted
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-geist text-2xl font-bold text-black dark:text-white">
        Instructions
      </h2>

      <div className="space-y-4">
        {instructions.map((instruction) => {
          const isChecked = checkedSteps.has(instruction.step);

          return (
            <div
              key={instruction.step}
              className={`flex gap-4 rounded-lg border border-neutral-200 bg-white p-4 transition-opacity dark:border-neutral-800 dark:bg-neutral-900 ${
                isChecked ? "opacity-50" : ""
              }`}
            >
              {/* Checkbox */}
              <div className="shrink-0 pt-1">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleStep(instruction.step)}
                  className="h-5 w-5 cursor-pointer rounded border-neutral-300 text-black focus:ring-2 focus:ring-black dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:ring-white"
                  aria-label={`Mark step ${instruction.step} as complete`}
                />
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-geist text-lg font-semibold text-black dark:text-white">
                    Step {instruction.step}
                  </span>
                  {instruction.timer && (
                    <button
                      onClick={() =>
                        startTimer(instruction.timer!, instruction.step)
                      }
                      className="flex items-center gap-1 rounded-md border border-neutral-300 bg-white px-2 py-1 text-xs text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                      aria-label={`Start ${instruction.timer} minute timer`}
                    >
                      <Play className="h-3 w-3" />
                      <Timer className="h-3 w-3" />
                      <span>{instruction.timer} min</span>
                    </button>
                  )}
                </div>
                <p
                  className={`text-neutral-700 dark:text-neutral-300 ${
                    isChecked ? "line-through" : ""
                  }`}
                >
                  {instruction.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
