import { useState } from "react";
import AwardsCascadeSlider, { type AwardsCascadeSlide } from "@/components/awards/AwardsCascadeSlider";
import Award1 from "@/assets/Awards/award1.jpg";
import Award2 from "@/assets/Awards/award2.jpg";
import Award3 from "@/assets/Awards/award3.jpg";
import Award4 from "@/assets/Awards/award4.jpg";
import Award5 from "@/assets/Awards/award5.jpg";
// import Award6 from "@/assets/Awards/award6.jpg";
import Award7 from "@/assets/Awards/award7.jpg";
import Award8 from "@/assets/Awards/award8.jpg";
import Award9 from "@/assets/Awards/award9.jpg";
import Award10 from "@/assets/Awards/award10.jpg";
import Award11 from "@/assets/Awards/award11.png";
import Award12 from "@/assets/Awards/award12_Swachha Andhra.png";

const DEMO_SLIDES: AwardsCascadeSlide[] = [
  {
    id: "a1",
    title: "Award 1",
    subtitle: "",
    imageUrl: Award1,
  },
  {
    id: "a2",
    title: "Award 2",
    subtitle: "",
    imageUrl: Award2,
  },
  {
    id: "a3",
    title: "Award 3",
    subtitle: "",
    imageUrl: Award3,
  },
  {
    id: "a4",
    title: "Award 4",
    subtitle: "",
    imageUrl: Award4,
  },
  {
    id: "a5",
    title: "Award 5",
    subtitle: "",
    imageUrl: Award5,
  },
  // {
  //   id: "a6",
  //   title: "Award 6",
  //   subtitle: "",
  //   imageUrl: Award6,
  // },
  {
    id: "a7",
    title: "Award 7",
    subtitle: "",
    imageUrl: Award7,
  },
  {
    id: "a8",
    title: "Award 8",
    subtitle: "",
    imageUrl: Award8,
  },
  {
    id: "a9",
    title: "Award 9",
    subtitle: "",
    imageUrl: Award9,
  },
  {
    id: "a10",
    title: "Award 10",
    subtitle: "",
    imageUrl: Award10,
  },
  {
    id: "a11",
    title: "Award 11",
    subtitle: "",
    imageUrl: Award11,
  },
  {
    id: "a12",
    title: "Award 12",
    subtitle: "",
    imageUrl: Award12,
  },
];

export default function CascadeSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <main className="min-h-screen bg-background px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Cascade Slider Demo</p>
        <h1 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          Awards Cascade <span className="text-primary">Preview</span>
        </h1>

        <div className="mt-8">
          <AwardsCascadeSlider
            slides={DEMO_SLIDES}
            currentIndex={currentIndex}
            onIndexChange={setCurrentIndex}
            imageOnly
          />
        </div>
      </div>
    </main>
  );
}
