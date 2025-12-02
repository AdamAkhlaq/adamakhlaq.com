import { Lightbulb } from "lucide-react";

interface RecipeNotesProps {
  notes: string[];
}

export function RecipeNotes({ notes }: RecipeNotesProps) {
  if (!notes || notes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        <h2 className="font-geist text-2xl font-bold text-black dark:text-white">
          Notes
        </h2>
      </div>

      <div className="rounded-lg border border-neutral-200 bg-amber-50 p-6 dark:border-neutral-800 dark:bg-amber-950/20">
        <ul className="space-y-3">
          {notes.map((note, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
            >
              <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-amber-500" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
