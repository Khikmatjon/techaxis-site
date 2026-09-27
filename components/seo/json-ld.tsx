// Structured data'ni (JSON-LD) sahifaga qo'yadi. "<" belgisi qochiriladi, shunda matn
// ichidagi "</script>" skriptni erta yopib qo'ya olmaydi.
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
