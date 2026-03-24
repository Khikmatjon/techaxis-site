// Komponent tepasida dict-ni qabul qilishni belgilaymiz
export const Hero = ({ dict }: { dict: any }) => {
  return (
    <section>
      {/* OLDIN: <h1>Dizayndan tortib ishlab chiqarishgacha</h1> */}
      {/* HOZIR: JSON fayldagi yo'lni yozamiz */}
      <h1 className="text-5xl font-bold">
        {dict.hero.title}
      </h1>

      <p className="text-xl">
        {dict.hero.subtitle}
      </p>

      <div className="flex gap-4">
        <button>{dict.hero.cta_software}</button>
        <button>{dict.hero.cta_training}</button>
      </div>
    </section>
  );
};