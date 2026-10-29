import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";

export function ActivitiesGrid({ activities }: { activities: string[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {activities.map((activity, i) => (
        <li key={activity}>
          <Reveal index={i % 3} className="h-full">
            <Card className="h-full">
              <span className="font-display text-3xl font-extrabold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-base text-light">{activity}</p>
            </Card>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
